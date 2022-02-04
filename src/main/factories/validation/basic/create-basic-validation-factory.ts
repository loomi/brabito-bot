import { Validation } from '@/application/validation/protocols';

import {
  RequiredFieldsValidation,
  ValidationComposite,
  NameValidation,
} from '@/application/validation/validators';

import { ValidatorNameAdapter } from '@/infra/validators';

const validations: Validation[] = [];

for (const field of ['name']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(new NameValidation('name', new ValidatorNameAdapter()));

export const makeCreateBasicValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
