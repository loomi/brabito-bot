import { Validation } from '@/application/validation/protocols';

import {
  ValidationComposite,
  NameValidation,
  SomeParamWithoutValidation,
  RequiredFieldsValidation,
  UuidValidation,
} from '@/application/validation/validators';

import { ValidatorNameAdapter, ValidatorUuidAdapter } from '@/infra/validators';

const validations: Validation[] = [];

for (const field of ['id']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(new UuidValidation('id', new ValidatorUuidAdapter()));
validations.push(new SomeParamWithoutValidation('id'));
validations.push(new NameValidation('name', new ValidatorNameAdapter()));

export const makeUpdateBasicValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
