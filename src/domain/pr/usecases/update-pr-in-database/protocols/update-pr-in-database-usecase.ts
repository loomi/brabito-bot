import { Pr, PrData } from '@/domain/pr';

export interface UpdatePrUsecase {
  update(prParams: UpdatePrUsecase.Params): Promise<UpdatePrUsecase.Result>;
}

export namespace UpdatePrUsecase {
  export type Params = {
    id: string;
    status?: PrData['status'];
    urgencyLevel?: PrData['urgenceLevel'];
    githubId?: PrData['githubId'];
    discordId?: PrData['discordId'];
    userDiscordId?: string;
  };
  export type Result = Pr | Error;
}
