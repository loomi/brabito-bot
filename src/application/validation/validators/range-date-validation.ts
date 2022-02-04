import { InvalidParamError } from '@/application/validation/errors';

import { DateValidator, Validation } from '@/application/validation/protocols';

export class RangeDateValidation implements Validation {
  private readonly fieldName: string;
  private readonly dateValidator: DateValidator;

  constructor(fieldName: string, dateValidator: DateValidator) {
    this.fieldName = fieldName;
    this.dateValidator = dateValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;

    const { initialDate, finalDate } = input[this.fieldName];

    if (initialDate) {
      const initialDateIsValid = this.dateValidator.validate(initialDate);

      if (!initialDateIsValid) {
        return new InvalidParamError(this.fieldName);
      }
    }

    if (finalDate) {
      const finalDateIsValid = this.dateValidator.validate(finalDate);

      if (!finalDateIsValid) {
        return new InvalidParamError(this.fieldName);
      }
    }
  }
}
