import { InvalidParamError } from '@/application/validation/errors';

import { RgValidator, Validation } from '@/application/validation/protocols';

export class RgValidation implements Validation {
  private readonly fieldName: string;
  private readonly rgValidator: RgValidator;

  constructor(fieldName: string, rgValidator: RgValidator) {
    this.fieldName = fieldName;
    this.rgValidator = rgValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    const isValid = this.rgValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
