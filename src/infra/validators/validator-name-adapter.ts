import { NameValidator } from '@/application/validation/protocols';

import validator from 'validator';

export class ValidatorNameAdapter implements NameValidator {
  validate(name: NameValidator.Params): any {
    const nameHasSpaces = validator.contains(name, ' ');

    if (nameHasSpaces) {
      return validator.isAlpha(name.replace(/\s/g, ''), 'pt-BR');
    }

    const nameIsValid = validator.isAlpha(name, 'pt-BR');
    return nameIsValid;
  }
}
