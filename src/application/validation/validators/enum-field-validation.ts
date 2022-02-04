import { InvalidParamError } from '@/application/validation/errors';

import { Validation } from '@/application/validation/protocols';

export class EnumFieldValidation implements Validation {
  private readonly fieldName: string;
  private readonly enumValues: any[];

  constructor(fieldName: string, enumValues: any[]) {
    this.fieldName = fieldName;
    this.enumValues = enumValues;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    if (!this.enumValues.includes(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
