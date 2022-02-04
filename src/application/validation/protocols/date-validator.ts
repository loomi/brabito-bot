export interface DateValidator {
  validate(date: DateValidator.Params): DateValidator.Result;
}

export namespace DateValidator {
  export type Params = string;
  export type Result = boolean;
}
