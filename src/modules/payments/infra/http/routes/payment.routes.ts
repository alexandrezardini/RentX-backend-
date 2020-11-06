import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const paymentsRouter = Router();
import TransactionsController from '../controllers/TransactionsController';

const transactionsController = new TransactionsController();

paymentsRouter.use(ensureAuthenticated);

paymentsRouter.post(
  '/submit-payment',
  celebrate({
    [Segments.BODY]: {
      card_hash: Joi.string().required(),
    },
  }),
  transactionsController.create,
);

export default paymentsRouter;
