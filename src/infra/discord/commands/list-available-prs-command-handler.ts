import { makeListPrService } from '@/main/factories/usecases/pr';
import { Message } from 'discord.js';

export const listAvailablePrsCommandHandler = async (message: Message) => {
  const listPrsService = makeListPrService();

  const { prs, totalPrs } = await listPrsService.list({
    status: 'not_allocated',
    orderBy: { property: 'status', mode: 'desc' },
  });

  if (!totalPrs) {
    await message.reply(
      `Obaaa, não existem prs abertos, parabéns backenders!!! :grin: :grin: :clap: :clap:`
    );

    return;
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
  Muito fácil, só rodar **/me_aloca <pr_id>** :wink:`;

  await message.reply(`${basicHello}\n${header}${listOfPrs}${footer}`);
};
