import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CarsController from '../controllers/CarsController';
import CarDayAvailabilityController from '../controllers/CarDayAvailabilityController';
import CarNameController from '../controllers/CarNameController';
import CarValueRangeController from '../controllers/CarValueRangeController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const carsRouter = Router();
const carsController = new CarsController();
const carDayAvailabilityController = new CarDayAvailabilityController();
const carNameController = new CarNameController();
const carValueRangeController = new CarValueRangeController();

carsRouter.use(ensureAuthenticated);

carsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      brand: Joi.string().required(),
      daily_value: Joi.number().required(),
      gas_type: Joi.string().required(),
      clutch: Joi.string().required(),
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

carsRouter.get(
  '/car-value-range',
  celebrate({
    [Segments.QUERY]: {
      from: Joi.number().required(),
      to: Joi.number().required(),
    },
  }),
  carValueRangeController.index,
);

export default carsRouter;
