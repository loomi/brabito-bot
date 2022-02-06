import { CreateUserUsecase, CreateUserInDatabaseRepository } from './protocols';
import { UUIDGenerator } from '@/shared/uuid';
import { User } from '@/domain/user';

type CreateUserInDatabaseServiceInjectables = {
  createUserInDatabaseRepository: CreateUserInDatabaseRepository;
  UUIDGenerator: UUIDGenerator;
};

class CreateUserInDatabaseService implements CreateUserUsecase {
  private readonly createUserInDatabaseRepository: CreateUserInDatabaseRepository;
  private readonly UUIDGenerator: UUIDGenerator;

  constructor({
    createUserInDatabaseRepository,
    UUIDGenerator,
  }: CreateUserInDatabaseServiceInjectables) {
    this.createUserInDatabaseRepository = createUserInDatabaseRepository;
    this.UUIDGenerator = UUIDGenerator;
  }

  async create(
    userParams: CreateUserUsecase.Params
  ): Promise<CreateUserUsecase.Result> {
    const { name, discordId } = userParams;

    const id = this.UUIDGenerator.generate();

    const newUser = new User({
      id,
      name,
      discordId,
    });

    return newUser;
  }
}

export { CreateUserInDatabaseService };
