export interface ObjectIdValidator {
  validate(objectId: ObjectIdValidator.Params): ObjectIdValidator.Result;
}

export namespace ObjectIdValidator {
  export type Params = string;
  export type Result = boolean;
}
