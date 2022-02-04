import { ListUsersFromDatabaseUsecase } from '@/domain/usecases/user';

import { UpdateUserInDatabaseError } from './errors';
import { UpdateUserInDatabaseUsecase } from './update-user-in-database-usecase';
import { UpdateUserInDatabaseRepository } from './protocols';
import { User } from '@/domain/entities';

type UpdateUserInDatabaseInjectables = {
  listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  updateUserInDatabaseRepository: UpdateUserInDatabaseRepository;
};

class UpdateUserInDatabase implements UpdateUserInDatabaseUsecase {
  private readonly listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  private readonly updateUserInDatabaseRepository: UpdateUserInDatabaseRepository;

  constructor({
    listUsersFromDatabaseUsecase,
    updateUserInDatabaseRepository,
  }: UpdateUserInDatabaseInjectables) {
    this.listUsersFromDatabaseUsecase = listUsersFromDatabaseUsecase;
    this.updateUserInDatabaseRepository = updateUserInDatabaseRepository;
  }

  async update(
    userParams: UpdateUserInDatabaseUsecase.Params
  ): Promise<UpdateUserInDatabaseUsecase.Result> {
    const { id, userRequester, ...paramsToUpdateUser } = userParams;

    const { users, totalUsers } = await this.listUsersFromDatabaseUsecase.list({
      userRequester,
      id,
    });

    if (totalUsers === 0) {
      throw new UpdateUserInDatabaseError('User not found');
    }

    const [user] = users;

    const userToBeUpdated = new User(user);

    const userRequesterCanUpdateThisUser =
      userRequester.canUpdateThisUser(userToBeUpdated);

    if (!userRequesterCanUpdateThisUser) {
      throw new UpdateUserInDatabaseError(
        'User requester do not have permissions to update this user'
      );
    }

    for (const [param, value] of Object.entries(paramsToUpdateUser)) {
      if (param === 'isAdmin') {
        userToBeUpdated.updateIsAdmin(value);
      }

      if (param === 'enabled') {
        userToBeUpdated.updateEnabled(value);
      }

      if (param === 'email') {
        userToBeUpdated.updateEmail(value);
      }

      if (param === 'name') {
        userToBeUpdated.updateName(value);
      }
    }

    const userToBeUpdatedData = userToBeUpdated.toJSON();

    await this.updateUserInDatabaseRepository.update(userToBeUpdatedData);

    return userToBeUpdatedData;
  }
}

export { UpdateUserInDatabase };
