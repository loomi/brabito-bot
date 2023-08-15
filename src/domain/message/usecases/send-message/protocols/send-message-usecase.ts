import { MessageData } from '@/domain/message/MessageData';
import { AvailableRoles } from '@/shared/types/roles-available';

export interface SendMessageUsecase {
  send(params: SendMessageUsecase.Params): Promise<SendMessageUsecase.Result>;
}

export namespace SendMessageUsecase {
  export type Params = {
    message: MessageData;
    recipient: AvailableRoles;
  };
  export type Result = void;
}
