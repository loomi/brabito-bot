import { UUIDGenerator } from '@/domain/usecases/protocols/uuid';
import { UUIDGeneratorAdapter } from '@/infra/uuid';

export const makeUUIDGeneratorAdapter = (): UUIDGenerator => {
  return new UUIDGeneratorAdapter();
};
