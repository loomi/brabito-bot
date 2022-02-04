import { Validation } from '@/application/validation/protocols';

import {
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/application/validation/validators';

const validations: Validation[] = [];

for (const field of ['refreshToken']) {
  validations.push(new RequiredFieldsValidation(field));
}

export const makeRefreshTokenValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
