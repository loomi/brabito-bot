import { Validation } from '@/application/validation/protocols';

import {
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/application/validation/validators';

import { ValidatorEmailAdapter } from '@/infra/validators';

const validations: Validation[] = [];

for (const field of ['email', 'password']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(new EmailValidation('email', new ValidatorEmailAdapter()));

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
