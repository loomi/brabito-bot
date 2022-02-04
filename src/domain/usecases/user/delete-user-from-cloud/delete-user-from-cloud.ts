import {
  DeleteUserFromCloudUsecase,
  ListUsersFromCloudUsecase,
} from '@/domain/usecases/user';
import { DeleteUserFromCloudError } from './errors';
import { DeleteUserFromCloudRepository } from './protocols';

type DeleteUserFromCloudInjectables = {
  listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  deleteUserFromCloudRepository: DeleteUserFromCloudRepository;
};

class DeleteUserFromCloud implements DeleteUserFromCloudUsecase {
  private readonly listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  private readonly deleteUserFromCloudRepository: DeleteUserFromCloudRepository;

  constructor({
    listUsersFromCloudUsecase,
    deleteUserFromCloudRepository,
  }: DeleteUserFromCloudInjectables) {
    this.listUsersFromCloudUsecase = listUsersFromCloudUsecase;
    this.deleteUserFromCloudRepository = deleteUserFromCloudRepository;
  }

  async delete(
    userParams: DeleteUserFromCloudUsecase.Params
  ): Promise<DeleteUserFromCloudUsecase.Result> {
    const { email } = userParams;

    const { usersFromCloud } = await this.listUsersFromCloudUsecase.list({
      email,
    });

    if (usersFromCloud.length === 0) {
      throw new DeleteUserFromCloudError(
        `User with email ${email} not found in cloud`
      );
    }

    await this.deleteUserFromCloudRepository.delete({ email });
  }
}

export { DeleteUserFromCloud };
