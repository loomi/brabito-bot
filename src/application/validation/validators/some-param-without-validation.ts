import { MissingParamError } from '@/application/validation/errors';

import { Validation } from '@/application/validation/protocols';

export class SomeParamWithoutValidation implements Validation {
  private readonly fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input === undefined || input === null) {
      return new MissingParamError('body');
    }

    const entriesOfInput = Object.entries(input);

    const filteredEntriesOfInput = entriesOfInput.filter(
      ([key, value]) => key !== this.fieldName
    );

    if (filteredEntriesOfInput.length === 0) {
      return new MissingParamError('body');
    }
  }
}
