import { Validation } from '@/application/validation/protocols';

import {
  EmailValidation,
  ValidationComposite,
  NameValidation,
  BooleanValidation,
  SomeParamWithoutValidation,
  RequiredFieldsValidation,
  UuidValidation,
} from '@/application/validation/validators';

import {
  ValidatorEmailAdapter,
  ValidatorNameAdapter,
  ValidatorBooleanAdapter,
  ValidatorUuidAdapter,
} from '@/infra/validators';

const validations: Validation[] = [];

for (const field of ['id']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(new UuidValidation('id', new ValidatorUuidAdapter()));
validations.push(new SomeParamWithoutValidation('id'));
validations.push(new EmailValidation('email', new ValidatorEmailAdapter()));
validations.push(new NameValidation('name', new ValidatorNameAdapter()));
validations.push(
  new BooleanValidation('isAdmin', new ValidatorBooleanAdapter())
);

export const makeUpdateUserValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
