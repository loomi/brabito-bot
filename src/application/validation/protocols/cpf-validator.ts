export interface CpfValidator {
  validate(cpf: CpfValidator.Params): CpfValidator.Result;
}

export namespace CpfValidator {
  export type Params = string;
  export type Result = boolean;
}
