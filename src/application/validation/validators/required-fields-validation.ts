import { MissingParamError } from '@/application/validation/errors';

import { Validation } from '@/application/validation/protocols';

export class RequiredFieldsValidation implements Validation {
  private readonly fieldName: string;
  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  validate(input: Validation.Params): Validation.Result {
    if ([null, undefined].includes(input[this.fieldName])) {
      return new MissingParamError(this.fieldName);
    }
  }
}
