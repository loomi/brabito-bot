import { InvalidParamError } from '@/application/validation/errors';

import { UuidValidator, Validation } from '@/application/validation/protocols';

export class UuidValidation implements Validation {
  private readonly fieldName: string;
  private readonly uuidValidator: UuidValidator;

  constructor(fieldName: string, uuidValidator: UuidValidator) {
    this.fieldName = fieldName;
    this.uuidValidator = uuidValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    const isValid = this.uuidValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
