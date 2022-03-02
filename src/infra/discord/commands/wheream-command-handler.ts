import { makeListPrService } from '@/main/factories/usecases/pr';
import { Message } from 'discord.js';
import { MessageOrigin } from '../helpers';

export const whereamiCommandHandler = async (
  message: Message,
  origin: MessageOrigin
) => {
  const listPrsService = makeListPrService();

  const { prs, totalPrs } = await listPrsService.list({
    origin: origin.channel,
    status: ['not_allocated'],
    orderBy: { property: 'createdAt', mode: 'desc' },
  });

  const closer = totalPrs
    ? `próximo ao PR de ID **${
        prs[0].toJSON().discordId
      }**). Aliás, já que estão na mesma órbita, que tal se alocar em... :wink:\nLink: ${
        prs[0].toJSON().githubLink
      }`
    : `próximo de meu coração quentinho, já que não tem nenhum PR aberto :smiling_face_with_3_hearts:).`;

  return await message.reply(
    `<@!${message.author.id}>, não se desespere!
    Suas cordenadas são (<@&${origin.roleToMention}>, ${closer}`
  );
};
