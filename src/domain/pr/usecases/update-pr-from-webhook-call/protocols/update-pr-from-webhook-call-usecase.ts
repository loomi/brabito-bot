export interface UpdatePrFromWebhookCallUsecase {
  updatePr(
    params: UpdatePrFromWebhookCallUsecase.Params
  ): Promise<UpdatePrFromWebhookCallUsecase.Result>;
}

export namespace UpdatePrFromWebhookCallUsecase {
  export type Params = any;
  export type Result = void;
}
