import { makeListPrService } from '@/main/factories/usecases/pr';
import { Message } from 'discord.js';
import { getCmdOptions, MessageOrigin } from '../helpers';

export const listAllPrsCommandHandler = async (
  message: Message,
  origin: MessageOrigin
) => {
  const listPrsService = makeListPrService();
  const { cmdOptions } = getCmdOptions(message.content);

  const wrongFormat = () => {
    message.reply(
      "Astronauta queride do meu coração :smiling_face_with_3_hearts:, tu errou o formato do comando...\nSe liga:\n\t\t~\t*How to use: `/prs <key_01>=<value_01> <key_02>=<value_02> ... <key_n>=<value_n>`*\n\t\t~\t*Available filters: `[pr_id: string as <PR_ID>, user_nick= string as <userGithubNick>, status: 'urgent' | 'important', project: string as <projectName>]`*\nAgora acerta esse formato ou eu te mando pra Saturno... :angry:"
    );
  };

  const validKeys = ['pr_id', 'user_nick', 'status', 'project'];

  const keysAndValues = cmdOptions.map((filterTag) => filterTag.split('='));
  if (keysAndValues.some(([key, value]) => !key || !value)) {
    return wrongFormat();
  } else if (keysAndValues.some(([key]) => !validKeys.includes(key))) {
    return wrongFormat();
  } else if (
    keysAndValues.some(
      ([key, value]) =>
        key === 'status' && value !== 'important' && value !== 'urgent'
    )
  ) {
    return wrongFormat();
  }

  const keysAndValuesAsObject = Object.fromEntries(keysAndValues);
  const urgenceLevel = keysAndValuesAsObject.status;
  const discordId = keysAndValuesAsObject.pr_id;
  const userGithubNick = keysAndValuesAsObject.user_nick;
  const projectName = keysAndValuesAsObject.project;

  const { prs, totalPrs } = await listPrsService.list({
    urgenceLevel,
    discordId,
    projectName,
    userGithubNick,
    orderBy: { property: 'createdAt', mode: 'desc' },
    status: ['not_allocated', 'allocated', 'changes_requested', 'wip'],
    origin: origin.channel,
  });

  if (!totalPrs) {
    return await message.reply(
      'Ihh, acho que não existem PRs com esses filtros em... :grimacing:'
    );
  }

  const basicHello = `Atualmente ${
    totalPrs === 1 ? 'existe 1 PR' : `existem ${totalPrs} PRs`
  } para serem ${
    totalPrs === 1 ? 'listado' : 'listados'
  } com essas configurações:\n`;

  const header = `\`\`\`##############################################################\nId do PR | Status | Situação | Quem abriu | Projeto\n--------------------------------------------------------------\n`;

  const listOfPrs = prs.map((pr) => {
    const prAsJSON = pr.toJSON();

    return `${prAsJSON.discordId} | ${prAsJSON.status} | ${prAsJSON.urgenceLevel} | ${prAsJSON.userGithubNick} | ${prAsJSON.projectName}\n`;
  });

  const footer = `-------------------------------------------------------------- \`\`\``;

  return await message.reply(
    `${basicHello}\n${header}${listOfPrs.join().replace(/,/gi, '')}${footer}`
  );
};
