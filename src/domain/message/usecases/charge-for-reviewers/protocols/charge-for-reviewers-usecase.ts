export interface ChargeForReviewersUsecase {
  chargeReviewers(
    params: ChargeForReviewersUsecase.Params
  ): Promise<ChargeForReviewersUsecase.Result>;
}

export namespace ChargeForReviewersUsecase {
  export type Params = { origin: 'back' | 'front' };
  export type Result = void;
}
