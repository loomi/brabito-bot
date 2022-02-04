import { Validation } from '@/application/validation/protocols';

import {
  ValidationComposite,
  RequiredFieldsValidation,
  UuidValidation,
} from '@/application/validation/validators';

import { ValidatorUuidAdapter } from '@/infra/validators';

const validations: Validation[] = [];

for (const field of ['id']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(new UuidValidation('id', new ValidatorUuidAdapter()));

export const makeDeleteBasicValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
