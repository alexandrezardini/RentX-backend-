import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RentalsController from '../controllers/RentalsController';
import RentalsMonthAvailability from '../controllers/RentalsMonthAvailability';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const rentalsRouter = Router();
const rentalsController = new RentalsController();
const rentalsMonthAvailability = new RentalsMonthAvailability();

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

rentalsRouter.get(
  '/:car_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      car_id: Joi.string().uuid().required(),
    },
  }),
  rentalsMonthAvailability.index,
);

export default rentalsRouter;
