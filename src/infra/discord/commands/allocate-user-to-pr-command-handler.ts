import { makeFindOrCreateAndAssociateUserToPrService } from '@/main/factories/usecases/user';
import { Message } from 'discord.js';
import { getCmdOptions } from '../helpers';

export const alloocateUserToPrCommandHandler = async (message: Message) => {
  const { cmdOptions } = getCmdOptions(message.content);

  const findOrCreateAndAllocateUser =
    makeFindOrCreateAndAssociateUserToPrService();

  const userDiscordId = message?.author?.id || 'not_found';
  const userName = message?.author?.username || 'not_found';

  if (!cmdOptions[0]) {
    return message.reply(
      `Ôhh astronauta, tá no mundo da lua é? :face_with_raised_eyebrow:\nTu esqueceu do ID do PR fi, na próxima te aloco em todos os disponíveis pra aprender... :rolling_eyes:`
    );
  }

  const prDiscordId = cmdOptions[0];
  if (
    [prDiscordId, userDiscordId, userName].some(
      (value) => value === 'not_found'
    )
  ) {
    return message.reply(
      'Desculpa, rolou algum bug :face_with_spiral_eyes:\nNão consegui extrair algumas informações que precisava, tenta novamente.'
    );
  }

  const result = await findOrCreateAndAllocateUser.findOrCreate({
    prDiscordId,
    userDiscordId,
    userName,
  });

  if (result === 'pr-not-found') {
    return message.reply(
      `<@!${userDiscordId}>, não achei esse PR não visse :grimacing:\nConfere aí se esse ID tá certinho... :thinking:\nSe quiser ajuda, roda \`/tem_pr\` que listo os PRs disponíveis pra ti. :wink:`
    );
  }

  return message.reply(
    `Show demais <@!${userDiscordId}>, gosto assim!!! :clap: :relieved:\nAgora cuida em corrigir isso aí blz... Pra ontem, vou cobrar! :hourglass: :angry:`
  );
};
