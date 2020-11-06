import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserBillingsController from '../controllers/UserBillingsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userBillingsController = new UserBillingsController();

const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      admin: Joi.boolean().required(),
    },
  }),
  usersController.create,
);

usersRouter.use(ensureAuthenticated);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

usersRouter.post(
  '/billings',
  celebrate({
    [Segments.BODY]: {
      state: Joi.string().required(),
      city: Joi.string().required(),
      neighborhood: Joi.string().required(),
      street: Joi.string().required(),
      street_number: Joi.string().required(),
      zipcode: Joi.string().required(),
      cpf: Joi.string().required(),
      phone_number: Joi.string().required(),
    },
  }),
  userBillingsController.create,
);

export default usersRouter;
