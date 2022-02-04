import { Controller } from '@/application/http-server/protocols';
import { DeleteUserController } from '@/application/http-server/controllers/user';

import { makeDeleteUserFromDatabaseUsecase } from '@/main/factories/usecases/user';
import { makeDeleteUserValidation } from '@/main/factories/validation/user';
import { makeLogControllerDecorator } from '@/main/factories/controllers';

export const makeDeleteUserController = (): Controller => {
  const deleteUserUsecase = makeDeleteUserFromDatabaseUsecase();

  const validation = makeDeleteUserValidation();

  const deleteUserController = new DeleteUserController(
    validation,
    deleteUserUsecase
  );

  const deleteUserControllerWithLogDecorator =
    makeLogControllerDecorator(deleteUserController);

  return deleteUserControllerWithLogDecorator;
};
