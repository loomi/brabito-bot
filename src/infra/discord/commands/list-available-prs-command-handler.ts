import { makeListPrService } from '@/main/factories/usecases/pr';
import { Message } from 'discord.js';

export const listAvailablePrsCommandHandler = async (message: Message) => {
  const listPrsService = makeListPrService();

  const { prs, totalPrs } = await listPrsService.list({
    status: 'not_allocated',
    orderBy: { property: 'status', mode: 'desc' },
  });

  if (!totalPrs) {
    return await message.reply(
      `Obaaa, não existem mais PRs abertos, parabéns backenders!!! :clap: :clap: :grin: :grin:\n||ps: nada mais que a obrigação de vcs tbm, né... :rolling_eyes:||`
    );
  }
  const basicHello = `Atualmente ${
    totalPrs === 1 ? 'existe' : 'existem'
  } ${totalPrs} ${totalPrs === 1 ? 'aberto' : 'abertos'}, olha a listinha:\n`;

  const header = `\`\`\`##############################################################\nId do PR | Situação | Quem abriu | Projeto\n--------------------------------------------------------------\n`;

  const listOfPrs = prs.map((pr) => {
    const prAsJSON = pr.toJSON();

    return `${prAsJSON.discordId} | ${prAsJSON.urgenceLevel} | ${prAsJSON.userGithubNick} | ${prAsJSON.projectName}\n`;
  });

  const footer = `-------------------------------------------------------------- \`\`\`

  E aí, que tal se alocar em algum, em?
  Muito fácil, só rodar **/me_aloca_aqui <pr_id>** :wink:`;

  return await message.reply(`${basicHello}\n${header}${listOfPrs}${footer}`);
};
