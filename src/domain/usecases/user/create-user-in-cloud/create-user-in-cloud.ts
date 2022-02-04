import { SaveUserInCloudRepository } from './protocols';
import { CreateUserInCloudUsecase } from './create-user-in-cloud-usecase';
import { ListUsersFromCloudUsecase } from '@/domain/usecases/user';
import { CreateUserInCloudError } from './errors';
import { ListUsersFromCloudRepository } from '../list-users-from-cloud/protocols';

type CreateUserInCloudInjectables = {
  saveUserInCloudRepository: SaveUserInCloudRepository;
  listUsersFromCloudUsecase: ListUsersFromCloudRepository;
};

class CreateUserInCloud implements CreateUserInCloudUsecase {
  private readonly saveUserInCloudRepository: SaveUserInCloudRepository;
  private readonly listUsersFromCloudUsecase: ListUsersFromCloudUsecase;

  constructor({
    saveUserInCloudRepository,
    listUsersFromCloudUsecase,
  }: CreateUserInCloudInjectables) {
    this.saveUserInCloudRepository = saveUserInCloudRepository;
    this.listUsersFromCloudUsecase = listUsersFromCloudUsecase;
  }

  async create(
    userParams: CreateUserInCloudUsecase.Params
  ): Promise<CreateUserInCloudUsecase.Result> {
    const { email } = userParams;

    const { usersFromCloud } = await this.listUsersFromCloudUsecase.list({
      email,
    });

    if (usersFromCloud.length !== 0) {
      throw new CreateUserInCloudError(
        `User with email: ${email} already exists in cloud`
      );
    }

    await this.saveUserInCloudRepository.save({ email });
  }
}

export { CreateUserInCloud };
