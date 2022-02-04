import validator from 'validator';

import { TokenValidator } from '@/application/validation/protocols';

export class ValidatorTokenAdapter implements TokenValidator {
  validate(token: TokenValidator.Params): TokenValidator.Result {
    const tokenIsValid = validator.isJWT(token);
    return tokenIsValid;
  }
}
