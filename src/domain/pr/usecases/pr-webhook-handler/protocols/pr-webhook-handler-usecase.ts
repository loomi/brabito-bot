export interface PrWebhookHandler {
  createOrUpdatePr(
    params: PrWebhookHandler.Params
  ): Promise<PrWebhookHandler.Result>;
}

export namespace PrWebhookHandler {
  export type Params = any;
  export type Result = void;
}
