import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CarsController from '../controllers/CarsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.use(ensureAuthenticated);

carsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      brand: Joi.string().required(),
      daily_value: Joi.number().required(),
    },
  }),
  carsController.create,
);

carsRouter.put(
  '/update/:car_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      brand: Joi.string().required(),
      daily_value: Joi.number().required(),
    },
  }),
  carsController.update,
);

carsRouter.delete('/delete/:car_id', carsController.delete);

carsRouter.get('/', carsController.index);

export default carsRouter;
