import { InvalidParamError } from '@/application/validation/errors';

import { CpfValidator, Validation } from '@/application/validation/protocols';

export class CpfValidation implements Validation {
  private readonly fieldName: string;
  private readonly cpfValidator: CpfValidator;

  constructor(fieldName: string, cpfValidator: CpfValidator) {
    this.fieldName = fieldName;
    this.cpfValidator = cpfValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    const isValid = this.cpfValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
