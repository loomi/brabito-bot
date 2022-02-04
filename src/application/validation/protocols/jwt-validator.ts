export interface JWTValidator {
  validate(jwt: JWTValidator.Params): JWTValidator.Result;
}

export namespace JWTValidator {
  export type Params = string;
  export type Result = boolean;
}
