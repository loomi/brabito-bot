import { Validation } from '@/application/validation/protocols';

import {
  ValidationComposite,
  NameValidation,
  NumberValidation,
  UuidValidation,
  RangeDateValidation,
  OrderByValidation,
} from '@/application/validation/validators';

import {
  ValidatorNameAdapter,
  ValidatorNumberAdapter,
  ValidatorUuidAdapter,
  ValidatorDateAdapter,
} from '@/infra/validators';

const validations: Validation[] = [];

validations.push(new UuidValidation('id', new ValidatorUuidAdapter()));
validations.push(new NameValidation('name', new ValidatorNameAdapter()));
validations.push(new NumberValidation('take', new ValidatorNumberAdapter()));
validations.push(new NumberValidation('skip', new ValidatorNumberAdapter()));
validations.push(
  new RangeDateValidation('createdAt', new ValidatorDateAdapter())
);
validations.push(
  new RangeDateValidation('updatedAt', new ValidatorDateAdapter())
);
validations.push(new OrderByValidation('orderBy'));

export const makeListBasicValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
