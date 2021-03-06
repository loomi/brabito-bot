import { makeListPrService } from '@/main/factories/usecases/pr';
import { Message } from 'discord.js';
import { MessageOrigin } from '../helpers';

export const listAllocatedPrsCommandHandler = async (
  message: Message,
  origin: MessageOrigin
) => {
  const basicHello = 'Listando a galerinha massa que tá alocada:\n';

  const listPrsService = makeListPrService();

  const { prs, totalPrs } = await listPrsService.list({
    status: ['allocated'],
    origin: origin.channel,
  });

  if (!totalPrs) {
    await message.reply(
      `Ninguém alocado em PRs!\nNão se se acho isso bom ou ruim :thinking:\nMas tô de olho viu... :eye:`
    );

    return;
  }

  const header = `\`\`\`##############################################################\nId do PR | Situação | Quem abriu | Usuário alocado | Projeto\n--------------------------------------------------------------\n`;

  const listOfPrs = prs.map((pr) => {
    const prAsJSON = pr.toJSON();

    return `${prAsJSON.discordId} | ${prAsJSON.urgenceLevel} | ${
      prAsJSON.userGithubNick
    } | ${prAsJSON?.user?.name || 'dont_know'} | ${prAsJSON.projectName}\n`;
  });

  const footer = `-------------------------------------------------------------- \`\`\`

  Boa galera, parabéns!!! :clap: :grin:
  Mas vamos andar com isso né... :face_with_monocle:
  5 horas na minha mesa, blz!? :hourglass: :face_with_raised_eyebrow:
  `;

  await message.reply(
    `${basicHello}${header}${listOfPrs.join().replace(/,/gi, '')}\n${footer}`
  );
};
