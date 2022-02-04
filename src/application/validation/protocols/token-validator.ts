export interface TokenValidator {
  validate(token: TokenValidator.Params): TokenValidator.Result;
}

export namespace TokenValidator {
  export type Params = string;
  export type Result = boolean;
}
