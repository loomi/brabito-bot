import { InvalidParamError } from '@/application/validation/errors';

import {
  NumberValidator,
  Validation,
} from '@/application/validation/protocols';

export class NumberValidation implements Validation {
  private readonly fieldName: string;
  private readonly numberValidator: NumberValidator;

  constructor(fieldName: string, numberValidator: NumberValidator) {
    this.fieldName = fieldName;
    this.numberValidator = numberValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    const isValid = this.numberValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
