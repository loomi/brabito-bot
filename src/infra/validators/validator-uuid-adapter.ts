import { UuidValidator } from '@/application/validation/protocols';

import validator from 'validator';

export class ValidatorUuidAdapter implements UuidValidator {
  validate(uuid: UuidValidator.Params): any {
    const uuidisValid = validator.isUUID(uuid);
    return uuidisValid;
  }
}
