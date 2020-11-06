import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import carsRouter from '@modules/cars/infra/http/routes/cars.routes';
import carSpecsRouter from '@modules/cars/infra/http/routes/carSpecs.routes';

import rentalsRouter from '@modules/rentals/infra/http/routes/rentals.routes';

import paymentsRouter from '@modules/payments/infra/http/routes/payment.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/cars', carsRouter);
routes.use('/car_specs', carSpecsRouter);
routes.use('/rentals', rentalsRouter);
routes.use('/payments', paymentsRouter);

export default routes;
