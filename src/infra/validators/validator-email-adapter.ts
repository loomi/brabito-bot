import { EmailValidator } from '@/application/validation/protocols';

import validator from 'validator';

export class ValidatorEmailAdapter implements EmailValidator {
  validate(email: EmailValidator.Params): EmailValidator.Result {
    const emailIsValid = validator.isEmail(email);
    return emailIsValid;
  }
}
