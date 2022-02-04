import { InvalidParamError } from '@/application/validation/errors';

import { JWTValidator, Validation } from '@/application/validation/protocols';

export class JWTValidation implements Validation {
  private readonly fieldName: string;
  private readonly jwtValidator: JWTValidator;

  constructor(fieldName: string, jwtValidator: JWTValidator) {
    this.fieldName = fieldName;
    this.jwtValidator = jwtValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;

    const isValid = this.jwtValidator.validate(input[this.fieldName]);

    if (isValid) {
      throw new InvalidParamError(this.fieldName);
    }
  }
}
