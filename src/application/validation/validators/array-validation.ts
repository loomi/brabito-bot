import { InvalidParamError } from '@/application/validation/errors';

import { Validator, Validation } from '@/application/validation/protocols';

export class ArrayValidation implements Validation {
  private readonly fieldName: string;
  private readonly validator: Validator;

  constructor(fieldName: string, validator: Validator) {
    this.fieldName = fieldName;
    this.validator = validator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    if (!Array.isArray(input[this.fieldName]))
      return new InvalidParamError(this.fieldName);

    // @ts-ignore
    const isValid = input[this.fieldName].map((item) =>
      this.validator.validate(item)
    );

    if (isValid.includes(false)) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
