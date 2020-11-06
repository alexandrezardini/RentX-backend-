import { container } from 'tsyringe';

import '@shared/container/providers/HashProvider';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';

import ICarSpecsRepository from '@modules/cars/repositories/ICarSpecsRepository';
import CarSpecsRepository from '@modules/cars/infra/typeorm/repositories/CarSpecsRepository';

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import RentalsRepository from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';

import ITransactionsRepository from '@modules/payments/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/payments/infra/typeorm/repositories/TransactionsRepository';

import IUserBillingsRepository from '@modules/users/repositories/IUserBillingsRepository';
import UserBillingsRepository from '@modules/users/infra/typeorm/repositories/UserBillingsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IUserBillingsRepository>(
  'UserBillingsRepository',
  UserBillingsRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarSpecsRepository>(
  'CarSpecsRepository',
  CarSpecsRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
