import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CarsController from '../controllers/CarsController';
import CarDayAvailabilityController from '../controllers/CarDayAvailabilityController';
import CarNameController from '../controllers/CarNameController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const carsRouter = Router();
const carsController = new CarsController();
const carDayAvailabilityController = new CarDayAvailabilityController();
const carNameController = new CarNameController();

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

carsRouter.get(
  '/day-availability',
  celebrate({
    [Segments.QUERY]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  carDayAvailabilityController.index,
);

carsRouter.get(
  '/car-name',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
    },
  }),
  carNameController.index,
);

export default carsRouter;
