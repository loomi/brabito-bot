import { UUIDGenerator } from '@/shared/uuid';
import { UUIDGeneratorAdapter } from '@/infra/uuid';

export const makeUUIDGeneratorAdapter = (): UUIDGenerator => {
  return new UUIDGeneratorAdapter();
};
