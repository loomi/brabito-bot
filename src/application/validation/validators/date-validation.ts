import { InvalidParamError } from '@/application/validation/errors';

import { DateValidator, Validation } from '@/application/validation/protocols';

export class DateValidation implements Validation {
  private readonly fieldName: string;
  private readonly dateValidator: DateValidator;

  constructor(fieldName: string, dateValidator: DateValidator) {
    this.fieldName = fieldName;
    this.dateValidator = dateValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    const isValid = this.dateValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
