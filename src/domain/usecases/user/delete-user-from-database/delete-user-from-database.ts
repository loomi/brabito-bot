import {
  DeleteUserFromDatabaseUsecase,
  ListUsersFromDatabaseUsecase,
} from '@/domain/usecases/user';
import { DeleteUserFromDatabaseError } from './errors';
import { DeleteUserFromDatabaseRepository } from './protocols';

type DeleteUserInjectables = {
  listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  deleteUserFromDatabaseRepository: DeleteUserFromDatabaseRepository;
};

class DeleteUserFromDatabase implements DeleteUserFromDatabaseUsecase {
  private readonly listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  private readonly deleteUserFromDatabaseRepository: DeleteUserFromDatabaseRepository;

  constructor({
    listUsersFromDatabaseUsecase,
    deleteUserFromDatabaseRepository,
  }: DeleteUserInjectables) {
    this.listUsersFromDatabaseUsecase = listUsersFromDatabaseUsecase;
    this.deleteUserFromDatabaseRepository = deleteUserFromDatabaseRepository;
  }

  async delete(
    userParams: DeleteUserFromDatabaseUsecase.Params
  ): Promise<DeleteUserFromDatabaseUsecase.Result> {
    const { userRequester, id } = userParams;

    const { totalUsers } = await this.listUsersFromDatabaseUsecase.list({
      userRequester,
      id,
    });

    if (totalUsers === 0) {
      throw new DeleteUserFromDatabaseError(`User not found in database`);
    }

    await this.deleteUserFromDatabaseRepository.delete({ id });
  }
}

export { DeleteUserFromDatabase };
