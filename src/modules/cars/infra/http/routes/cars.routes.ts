import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CarsController from '../controllers/CarsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const carsController = new CarsController();

profileRouter.use(ensureAuthenticated);

profileRouter.post(
  '/:user_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      brand: Joi.string().required(),
      daily_value: Joi.number().required(),
    },
  }),
  carsController.create,
);

export default profileRouter;
