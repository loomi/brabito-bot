export interface NameValidator {
  validate(name: NameValidator.Params): NameValidator.Result;
}

export namespace NameValidator {
  export type Params = string;

  export type Result = boolean;
}
