import { makeSendMessage } from '../send-message';
import { makeListPrService, makeUpdatePrService } from '.';
import { ChargeForReviewersService } from '@/domain/message/usecases/charge-for-reviewers';
import { ChargeForReviewersUsecase } from '@/domain/message/usecases/charge-for-reviewers/protocols';

export const makeChargeForReviewersService = (): ChargeForReviewersUsecase => {
  const listPrsUsecase = makeListPrService();
  const updatePrsUsecase = makeUpdatePrService();
  const sendMessageUsecase = makeSendMessage();

  return new ChargeForReviewersService(
    sendMessageUsecase,
    listPrsUsecase,
    updatePrsUsecase
  );
};
