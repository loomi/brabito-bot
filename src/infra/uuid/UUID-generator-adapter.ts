import { v4 as uuidv4 } from 'uuid';

import { UUIDGenerator } from '@/domain/usecases/protocols/uuid';

export class UUIDGeneratorAdapter implements UUIDGenerator {
  generate(): string {
    return uuidv4();
  }
}
