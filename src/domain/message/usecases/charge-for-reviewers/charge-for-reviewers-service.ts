import { ListPrsUsecase } from '@/domain/pr/usecases/list-prs-from-database/protocols';

import { SendMessageUsecase } from '@/domain/message/usecases/send-message/protocols';
import { ChargeForReviewersUsecase } from './protocols';

import { env } from '@/main/config';
import { UpdatePrUsecase } from '@/domain/pr/usecases/update-pr-in-database/protocols';

export class ChargeForReviewersService implements ChargeForReviewersUsecase {
  private readonly sendMessageUsecase: SendMessageUsecase;
  private readonly listPrsService: ListPrsUsecase;
  private readonly updatePrService: UpdatePrUsecase;

  constructor(
    sendMessageUsecase: SendMessageUsecase,
    listPrsUsecase: ListPrsUsecase,
    updatePrUsecase: UpdatePrUsecase
  ) {
    this.sendMessageUsecase = sendMessageUsecase;
    this.listPrsService = listPrsUsecase;
    this.updatePrService = updatePrUsecase;
  }

  async chargeReviewers(
    params: ChargeForReviewersUsecase.Params
  ): Promise<void> {
    const origin = params.origin;

    const getRoleToMention = {
      back: env.bot.channels.backRole,
      front: env.bot.channels.frontRole,
    };
    const roleToMention = getRoleToMention[origin];

    await this.handleWithPrs(
      'important',
      'not_allocated',
      env.scheduler.notAllocatedImportantReviews,
      'hours',
      roleToMention,
      origin
    );
    await this.handleWithPrs(
      'urgent',
      'not_allocated',
      env.scheduler.notAllocatedUrgentReviews,
      'minutes',
      roleToMention,
      origin
    );
    await this.handleWithPrs(
      'important',
      'allocated',
      env.scheduler.allocatedImportantReviews,
      'hours',
      roleToMention,
      origin
    );
    await this.handleWithPrs(
      'urgent',
      'allocated',
      env.scheduler.allocatedUrgentReviews,
      'hours',
      roleToMention,
      origin
    );
  }

  private async handleWithPrs(
    urgenceLevel: 'important' | 'urgent',
    prStatus: 'not_allocated' | 'allocated',
    requestIntervals: number,
    scopeToHandle: 'hours' | 'minutes',
    roleToMention: string,
    origin: 'back' | 'front'
  ) {
    const { prs } = await this.listPrsService.list({
      status: [prStatus],
      urgenceLevel,
      origin,
    });

    const scope = {
      hours: 60 * 60 * 1000,
      minutes: 60 * 1000,
    };

    const intervalBetweenNotifications =
      requestIntervals * scope[scopeToHandle];
    const currTime = new Date().getTime();

    const messagesToSend = await Promise.all(
      prs.map(async (currPr) => {
        const {
          id,
          lastReviewChecked,
          createdAt,
          projectName,
          userGithubNick,
          githubLink,
          discordId,
          user,
        } = currPr.toJSON();

        const lastReviewChargeTime = lastReviewChecked.getTime();
        const timePassed = currTime - lastReviewChargeTime;
        const shouldNotify = timePassed >= intervalBetweenNotifications;

        if (shouldNotify) {
          const openSinceXHoursOrMinutes = Math.floor(
            (currTime - createdAt.getTime()) / scope[scopeToHandle]
          );

          const messagesForNotAllocated = {
            important: [
              `J?? desisti de vcs viu <@&${roleToMention}>, se aloquem ou n??o, n??o vou ficar mais de :clown: aqui...\nps: se existir alguma alma caridosa, seguem os dados: PR **${discordId}** de **${projectName}** aberto por **${userGithubNick}** com link ${githubLink}`,
              `<@&${roleToMention}>, preciso de algu??m pra corrigir o PR **${discordId}** l?? em **${projectName}** l?? em ${githubLink}`,
              `E a?? astronautas de <@&${roleToMention}>, PR de **${projectName}** aberto h?? **${openSinceXHoursOrMinutes}h**, ningu??m vai se alocar n??o? :angry:\nOlha o link: ${githubLink}`,
              `<@&${roleToMention}>, preciso de algu??m pra corrigir o PR **${discordId}** l?? em **${projectName}** l?? em ${githubLink}`,
              `<@&${roleToMention}>, por favor n??, o tempo t?? passando... Ningu??m vai corrigir o PR de **${userGithubNick}** l?? em **${projectName}** n??o? :rage:\nOlha o link: ${githubLink}`,
              `<@&${roleToMention}>, preciso de algu??m pra corrigir o PR **${discordId}** l?? em **${projectName}** l?? em ${githubLink}`,
              `Galerinha querida de <@&${roleToMention}>, se ningu??m se alocar no PR **${discordId}** de **${projectName}** eu mesmo vou alocar viu, n??o me desafiem! :face_with_symbols_over_mouth:\nOlha o link: ${githubLink}`,
              `<@&${roleToMention}>, preciso de algu??m pra corrigir o PR **${discordId}** l?? em **${projectName}** l?? em ${githubLink}`,
            ],
            urgent: [
              `<@&${roleToMention}>, o PR **${discordId}** de **${projectName}** t?? marcado como urgente, ent??o corram pra se alocar e revisar!!!\nOlha o link: ${githubLink}`,
              `<@&${roleToMention}>, voc??s entendem o conceito da palavra URGENTE? Caso n??o, lidem com os clientes de **${projectName}** no lugar de **${userGithubNick}**, pq eles querem o PR **${discordId}** em prod pra ontem!!!\nOlha o link: ${githubLink}`,
            ],
          };
          const messagesForAllocated = {
            important: [
              `<@!${user?.discordId}> sem querer pressionar, mas j?? precionando...\nO PR de **${projectName}** continua aberto... :grimacing:\nSe n??o conseguir corrigir agora, tu pode passar o PR pra outra pessoa t??, e t?? tudo bem!\nOlha o link: ${githubLink}`,
              `Fala <@!${user?.discordId}> meu queride, lembra que tu tais alocado no PR de **${projectName}**, blz?? D?? uma conferida l?? quando puder...\nOlha o link: ${githubLink}\n||ps: o quanto antes melhor||`,
              `<@!${user?.discordId}> s?? pra relembrar que tu se alocou pra corrigir o PR l?? em **${projectName}**, visse!?\nOlha o link: ${githubLink}`,
              `<@!${user?.discordId}> :rose::rose: s??o vermelhas e violetas s??o azuis, mas mesmo assim o PR de **${projectName}** continua esperando sua revis??o... :sweat: :wilted_rose:\nOlha o link: ${githubLink}`,
              `Contato! Repetindo, contato! <@!${user?.discordId}> existe um PR em **${projectName}** no qual voc?? est?? alocado para revis??o!\nOlha o link: ${githubLink}`,
            ],
            urgent: [
              `${
                user?.discordId ? `<@!${user?.discordId}>` : user?.name
              }, vc j?? est?? a frente do rol?? s?? por ter se alocado!\nMas ?? que o PR t?? marcado como urgente :grimacing:\nTem como ver isso o quanto antes?\nOlha o link: ${githubLink}`,
              `<@!${user?.discordId}> meu queride, eu sei que t?? corrido por a??, mas t?? corrido pra ${userGithubNick} tbm (principalmente com esse PR espec??fico :grimacing:)\nTem como tu dar aquele g??s pra a gente fechar esse PR?\nOlha o link: ${githubLink}`,
              `<@!${user?.discordId}> sem querer pressionar, mas t?? aqui pra isso n??...\nO PR de **${projectName}** continua aberto... :grimacing:\nSe n??o conseguir corrigir agora, tu pode passar o PR pra outra pessoa t??, e t?? tudo bem!\n?? s?? que, como o PR ?? urgente, a gente precisa daquele ??ltimo g??s sabe :sweat:\nOlha o link: ${githubLink}`,
              `Ou pessoal de <@&${roleToMention}>, ningu??m consegue ajudar <@!${user?.discordId}> com esse PR n??o? Parece que t?? bem punk pra elu... :grimacing:\nPra rolar essa troca de reviewer ?? s?? outra pessoa rodar \`/me_aloca_aqui ${discordId}\` :wink:\nOlha o link: ${githubLink}`,
            ],
          };
          const messageToSend =
            prStatus === 'not_allocated'
              ? messagesForNotAllocated[urgenceLevel][
                  openSinceXHoursOrMinutes %
                    messagesForNotAllocated[urgenceLevel].length
                ]
              : messagesForAllocated[urgenceLevel][
                  openSinceXHoursOrMinutes %
                    messagesForAllocated[urgenceLevel].length
                ];

          await this.updatePrService.update({
            id,
            lastReviewChecked: new Date(currTime),
          });

          return {
            message: messageToSend,
            openSince: openSinceXHoursOrMinutes,
            discordId,
            projectName,
            userGithubNick,
            userDiscordId: user?.discordId,
            userName: user?.name,
          };
        }

        return null;
      })
    );

    const messages = messagesToSend.filter(
      (possibleMessage) => possibleMessage !== null
    );

    const scopeContentMessage = {
      not_allocated: 'PRs abertos, quem vai se alocar???',
      allocated: 'PR alocados e que precisam de corre????o',
    };

    const finalAdvise = {
      not_allocated: `Ahh, s?? pra lembrar: \`/me_aloca_aqui <PR_ID>\``,
      allocated: 'Galerinha que foi marcada a?? na tabela, vamos cuidar n??...',
    };

    if (messages.length === 0) {
      // do nothing;
    } else if (messages.length === 1) {
      await this.sendMessageUsecase.send({
        message: {
          content: messages[0]?.message || '',
        },
        recipient: origin,
      });
    } else {
      const header = `\`\`\`##############################################################\nId do PR | Espera | Projeto | Quem abriu${
        prStatus === 'allocated' ? ' | Respons??vel' : ''
      }\n--------------------------------------------------------------\n`;

      const listOfPrs = messages.map((content) => {
        return `${content?.discordId} | ${content?.openSince}h | ${
          content?.projectName
        } | ${content?.userGithubNick}${
          prStatus === 'allocated' ? ` | ${content?.userName}` : ''
        }\n`;
      });
      const listOfPeoples =
        prStatus === 'allocated'
          ? messages.map((content) => `\nSe liga <@!${content?.userDiscordId}>`)
          : [''];

      await this.sendMessageUsecase.send({
        message: {
          content: `Bora <@&${roleToMention}>, sem mensagem bonitinha pq o assunto ?? s??rio${
            urgenceLevel === 'urgent' ? ' (s??rio n??o URGENTEEE)' : ''
          }.\nTemos ${messages.length} ${
            scopeContentMessage[prStatus]
          }${header}${listOfPrs.join().replace(/,/gi, '')}\`\`\`\n${
            finalAdvise[prStatus]
          }${listOfPeoples.join().replace(/,/gi, '')}`,
        },
        recipient: origin,
      });
    }
  }
}
