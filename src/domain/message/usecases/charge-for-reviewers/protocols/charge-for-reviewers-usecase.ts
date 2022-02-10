export interface ChargeForReviewersUsecase {
  chargeReviewers(
    params: ChargeForReviewersUsecase.Params
  ): Promise<ChargeForReviewersUsecase.Result>;
}

export namespace ChargeForReviewersUsecase {
  export type Params = void;
  export type Result = void;
}
