import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RentalsController from '../controllers/RentalsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const rentalsRouter = Router();
const rentalsController = new RentalsController();

rentalsRouter.use(ensureAuthenticated);

rentalsRouter.post(
  '/:car_id',
  celebrate({
    [Segments.BODY]: {
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
    },
  }),
  rentalsController.create,
);
export default rentalsRouter;
