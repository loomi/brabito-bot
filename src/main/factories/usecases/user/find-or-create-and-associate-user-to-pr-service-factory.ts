import { FindOrCreateAndAssociateUserToPrService } from '@/domain/user/usecases/find-or-create-and-associate-user-to-pr';
import { FindoOrCreateAndAssociateUserToPrUsecase } from '@/domain/user/usecases/find-or-create-and-associate-user-to-pr/protocols';
import { makeListPrService, makeUpdatePrService } from '../pr';
import { makeUUIDGeneratorAdapter } from '../../infra/uuid';
import { makeListUserService, makeCreateUserService } from './';

export const makeFindOrCreateAndAssociateUserToPrService =
  (): FindoOrCreateAndAssociateUserToPrUsecase => {
    const listPrsService = makeListPrService();
    const updatePrService = makeUpdatePrService();
    const UUIDGenerator = makeUUIDGeneratorAdapter();

    const listUsersService = makeListUserService();
    const createUserService = makeCreateUserService();

    return new FindOrCreateAndAssociateUserToPrService({
      listPrsService,
      updatePrService,
      UUIDGenerator,
      listUsersService,
      createUserService,
    });
  };
