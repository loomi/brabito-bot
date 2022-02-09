import { PrData } from '@/domain/pr';
import { User } from '@/domain/user';

export interface FindoOrCreateAndAssociateUserToPrUsecase {
  findOrCreate(
    userParams: FindoOrCreateAndAssociateUserToPrUsecase.Params
  ): Promise<FindoOrCreateAndAssociateUserToPrUsecase.Result>;
}

export namespace FindoOrCreateAndAssociateUserToPrUsecase {
  export type Params = {
    userDiscordId: User['discordId'];
    userName: User['name'];
    prDiscordId: PrData['discordId'];
  };
  export type Result = User | 'pr-not-found';
}
