import { DateValidator } from '@/application/validation/protocols';
import validator from 'validator';

export class ValidatorDateAdapter implements DateValidator {
  validate(date: DateValidator.Params): DateValidator.Result {
    const isValidDate = validator.isISO8601(date);
    return isValidDate;
  }
}
