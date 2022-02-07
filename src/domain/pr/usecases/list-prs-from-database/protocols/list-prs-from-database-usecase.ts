import { Pr, PrData } from '@/domain/pr';

export interface ListPrsUsecase {
  list(prFilters: ListPrsUsecase.Params): Promise<ListPrsUsecase.Result>;
}

export namespace ListPrsUsecase {
  export type Params = {
    id?: string;
    status?: PrData['status'];
    urgencyLevel?: PrData['urgenceLevel'];
    githubId?: PrData['githubId'];
    discordId?: PrData['discordId'];
    userDiscordId?: string;
    createdAt?: { inititalDate: string; finalDate: string };
    updatedAt?: { inititalDate: string; finalDate: string };
    take?: number;
    skip?: number;
    orderBy?: {
      property: string;
      mode: 'asc' | 'desc';
    };
  };
  export type Result = { prs: Pr[]; totalPrs: number };
}