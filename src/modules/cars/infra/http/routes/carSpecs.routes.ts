import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CarSpecsController from '../controllers/CarSpecsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const carSpecsController = new CarSpecsController();

profileRouter.use(ensureAuthenticated);

profileRouter.post(
  '/:car_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      icon: Joi.string().required(),
    },
  }),
  carSpecsController.create,
);

export default profileRouter;
