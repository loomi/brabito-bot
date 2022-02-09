import { Pr, PrData, PrInput } from '@/domain/pr';

export interface UpdatePrUsecase {
  update(prParams: UpdatePrUsecase.Params): Promise<UpdatePrUsecase.Result>;
}

export namespace UpdatePrUsecase {
  export type Params = {
    id: string;
    status?: PrInput['status'];
    urgencyLevel?: PrData['urgenceLevel'];
    githubId?: PrData['githubId'];
    discordId?: PrData['discordId'];
    userId?: string;
  };
  export type Result = Pr | Error;
}
