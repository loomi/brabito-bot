import { MessageData } from '@/domain/message/MessageData';

export interface SendMessageUsecase {
  send(params: SendMessageUsecase.Params): Promise<SendMessageUsecase.Result>;
}

export namespace SendMessageUsecase {
  export type Params = {
    message: MessageData;
    recipient: 'back' | 'front';
  };
  export type Result = void;
}
