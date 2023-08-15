import { AvailableRoles } from '@/shared/types/roles-available';

export interface ChargeForReviewersUsecase {
  chargeReviewers(
    params: ChargeForReviewersUsecase.Params
  ): Promise<ChargeForReviewersUsecase.Result>;
}

export namespace ChargeForReviewersUsecase {
  export type Params = { origin: AvailableRoles };
  export type Result = void;
}
