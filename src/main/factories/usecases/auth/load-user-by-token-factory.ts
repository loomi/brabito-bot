import { LoadUserByTokenUsecase } from '@/domain/usecases/auth';
import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';
import { LoadUserByToken } from '@/domain/usecases/auth/load-user-by-token/load-user-by-token';
import { makeLoadUserByTokenInCloudUsecase } from '@/main/factories/usecases/auth';

export const makeLoadUserByTokenUsecase = (): LoadUserByTokenUsecase => {
  const loadUserByTokenInCloudUsecase = makeLoadUserByTokenInCloudUsecase();
  const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();

  return new LoadUserByToken({
    loadUserByTokenInCloudUsecase,
    listUsersFromDatabaseUsecase,
  });
};
