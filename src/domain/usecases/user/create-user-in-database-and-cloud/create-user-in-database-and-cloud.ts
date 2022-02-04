import {
  DeleteUserFromDatabaseUsecase,
  CreateUserInCloudUsecase,
  CreateUserInDatabaseUsecase,
} from '@/domain/usecases/user';

import { CreateUserInDatabaseAndCloudUsecase } from './create-user-in-database-and-cloud-usecase';

type CreateUserInDatabaseAndCloudInjectables = {
  createUserInDatabaseUsecase: CreateUserInDatabaseUsecase;
  createUserInCloudUsecase: CreateUserInCloudUsecase;
  deleteUserFromDatabaseUsecase: DeleteUserFromDatabaseUsecase;
};

class CreateUserInDatabaseAndCloud
  implements CreateUserInDatabaseAndCloudUsecase
{
  private readonly createUserInDatabaseUsecase: CreateUserInDatabaseUsecase;
  private readonly createUserInCloudUsecase: CreateUserInCloudUsecase;
  private readonly deleteUserFromDatabaseUsecase: DeleteUserFromDatabaseUsecase;

  constructor({
    createUserInDatabaseUsecase,
    createUserInCloudUsecase,
    deleteUserFromDatabaseUsecase,
  }: CreateUserInDatabaseAndCloudInjectables) {
    this.createUserInDatabaseUsecase = createUserInDatabaseUsecase;
    this.createUserInCloudUsecase = createUserInCloudUsecase;
    this.deleteUserFromDatabaseUsecase = deleteUserFromDatabaseUsecase;
  }

  async create(
    userParams: CreateUserInDatabaseAndCloudUsecase.Params
  ): Promise<CreateUserInDatabaseAndCloudUsecase.Result> {
    const { userRequester, isAdmin, name, email } = userParams;

    const user = await this.createUserInDatabaseUsecase.create({
      userRequester,
      isAdmin,
      name,
      email,
    });

    try {
      await this.createUserInCloudUsecase.create({ email });
    } catch (error) {
      const { id: userId } = user;

      await this.deleteUserFromDatabaseUsecase.delete({
        userRequester,
        id: userId,
      });

      throw error;
    }

    return user;
  }
}

export { CreateUserInDatabaseAndCloud };
