import { ListPrsUsecase } from '@/domain/pr/usecases/list-prs-from-database/protocols';

import { SendMessageUsecase } from '../send-message';
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

  async chargeReviewers(): Promise<void> {
    await this.handleWithPrs(
      'important',
      'not_allocated',
      env.scheduler.notAllocatedImportantReviews,
      'hours'
    );
    await this.handleWithPrs(
      'urgent',
      'not_allocated',
      env.scheduler.notAllocatedUrgentReviews,
      'minutes'
    );
    await this.handleWithPrs(
      'important',
      'allocated',
      env.scheduler.allocatedImportantReviews,
      'hours'
    );
    await this.handleWithPrs(
      'urgent',
      'allocated',
      env.scheduler.allocatedUrgentReviews,
      'hours'
    );
  }

  private async handleWithPrs(
    urgenceLevel: 'important' | 'urgent',
    prStatus: 'not_allocated' | 'allocated',
    requestIntervals: number,
    scopeToHandle: 'hours' | 'minutes'
  ) {
    const { prs } = await this.listPrsService.list({
      status: [prStatus],
      urgenceLevel,
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
              `Já desisti de vcs viu <@&805765119384616962>, se aloquem ou não, não vou ficar mais de :clown: aqui...\nps: se existir alguma alma caridosa, seguem os dados: PR **${discordId}** de **${projectName}** aberto por **${userGithubNick}**`,
              `<@&805765119384616962>, preciso de alguém pra corrigir o PR **${discordId}** lá em **${projectName}**`,
              `E aí astronautas de <@&805765119384616962>, PR de **${projectName}** aberto há **${openSinceXHoursOrMinutes}h**, ninguém vai se alocar não? :angry:`,
              `<@&805765119384616962>, preciso de alguém pra corrigir o PR **${discordId}** lá em **${projectName}**`,
              `<@&805765119384616962>, por favor né, o tempo tá passando... Ninguém vai corrigir o PR de **${userGithubNick}** lá em **${projectName}** não? :rage:`,
              `<@&805765119384616962>, preciso de alguém pra corrigir o PR **${discordId}** lá em **${projectName}**`,
              `Galerinha querida de <@&805765119384616962>, se ninguém se alocar no PR **${discordId}** de **${projectName}** eu mesmo vou alocar viu, não me desafiem! :face_with_symbols_over_mouth:`,
              `<@&805765119384616962>, preciso de alguém pra corrigir o PR **${discordId}** lá em **${projectName}**`,
            ],
            urgent: [
              `<@&805765119384616962>, o PR **${discordId}** de **${projectName}** tá marcado como urgente, então corram pra se alocar e revisar!!!`,
              `<@&805765119384616962>, vocês entendem o conceito da palavra URGENTE? Caso não, lidem com os clientes de **${projectName}** no lugar de **${userGithubNick}**, pq eles querem o PR **${discordId}** em prod pra ontem!!!`,
            ],
          };
          const messagesForAllocated = {
            important: [
              `<@!${user?.discordId}> sem querer pressionar, mas já precionando...\nO PR de **${projectName}** continua aberto... :grimacing:\nSe não conseguir corrigir agora, tu pode passar o PR pra outra pessoa tá, e tá tudo bem!\n`,
              `Contato! Repetindo, contato! <@!${user?.discordId}> existe um PR em **${projectName}** no qual você está alocado para revisão!`,
              `Fala <@!${user?.discordId}> meu queride, lembra que tu tais alocado no PR de **${projectName}**, blz?? Dá uma conferida lá quando puder...\n||ps: o quanto antes melhor||`,
              `Contato! Repetindo, contato! <@!${user?.discordId}> existe um PR em **${projectName}** no qual você está alocado para revisão!`,
              `<@!${user?.discordId}> só pra relembrar que tu se alocou pra corrigir o PR lá em **${projectName}**, visse!?`,
              `Contato! Repetindo, contato! <@!${user?.discordId}> existe um PR em **${projectName}** no qual você está alocado para revisão!`,
              `<@!${user?.discordId}> :rose::rose: são vermelhas e violetas são azuis, mas mesmo assim o PR de **${projectName}** continua esperando sua revisão... :sweat: :wilted_rose:`,
              `Contato! Repetindo, contato! <@!${user?.discordId}> existe um PR em **${projectName}** no qual você está alocado para revisão!`,
            ],
            urgent: [
              `${
                user?.discordId ? `<@!${user?.discordId}>` : user?.name
              }, vc já está a frente do rolê só por ter se alocado!\nMas é que o PR tá marcado como urgente :grimacing:\nTem como ver isso o quanto antes?`,
              `<@!${user?.discordId}> meu queride, eu sei que tá corrido por aí, mas tá corrido pra ${userGithubNick} tbm (principalmente com esse PR específico :grimacing:)\nTem como tu dar aquele gás pra a gente fechar esse PR?`,
              `<@!${user?.discordId}> sem querer pressionar, mas tô aqui pra isso né...\nO PR de **${projectName}** continua aberto... :grimacing:\nSe não conseguir corrigir agora, tu pode passar o PR pra outra pessoa tá, e tá tudo bem!\nÉ só que, como o PR é urgente, a gente precisa daquele último gás sabe :sweat:`,
              `Ou pessoal de <@&805765119384616962>, ninguém consegue ajudar <@!${user?.discordId}> com esse PR não? Parece que tá bem punk pra elu... :grimacing:\nPra rolar essa troca de reviewer é só outra pessoa rodar \`/me_aloca_aqui ${discordId}\` :wink:`,
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
      allocated: 'PR alocados e que precisam de correção',
    };

    const finalAdvise = {
      not_allocated: `Ahh, só pra lembrar: \`/me_aloca_aqui <PR_ID>\``,
      allocated: 'Galerinha que foi marcada aí na tabela, vamos cuidar né...',
    };

    if (messages.length === 0) {
      // do nothing;
    } else if (messages.length === 1) {
      await this.sendMessageUsecase.send({
        content: messages[0]?.message || '',
      });
    } else {
      const header = `\`\`\`##############################################################\nId do PR | Espera | Projeto | Quem abriu${
        prStatus === 'allocated' ? ' | Responsável' : ''
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
        content: `Bora <@&805765119384616962>, sem mensagem bonitinha pq o assunto é sério${
          urgenceLevel === 'urgent' ? ' (sério não URGENTEEE)' : ''
        }.\nTemos ${messages.length} ${
          scopeContentMessage[prStatus]
        }${header}${listOfPrs.join().replace(/,/gi, '')}\`\`\`\n${
          finalAdvise[prStatus]
        }${listOfPeoples.join().replace(/,/gi, '')}`,
      });
    }
  }
}
