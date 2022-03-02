import { Pr, PrData } from '@/domain/pr';

export interface ListPrsUsecase {
  list(prFilters: ListPrsUsecase.Params): Promise<ListPrsUsecase.Result>;
}

export namespace ListPrsUsecase {
  export type Params = {
    id?: string;
    status?: Array<PrData['status']>;
    urgenceLevel?: PrData['urgenceLevel'];
    githubId?: PrData['githubId'];
    discordId?: PrData['discordId'];
    userGithubNick?: string;
    projectName?: string;
    createdAt?: { inititalDate: string; finalDate: string };
    updatedAt?: { inititalDate: string; finalDate: string };
    take?: number;
    skip?: number;
    orderBy?: {
      property: string;
      mode: 'asc' | 'desc';
    };
    origin?: PrData['origin'];
  };
  export type Result = { prs: Pr[]; totalPrs: number };
}
