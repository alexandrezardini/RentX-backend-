import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserBillingsRepository from '../repositories/IUserBillingsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import ICreateBillingDTO from '@modules/users/dtos/ICreateBillingDTO';

import UserBilling from '../infra/typeorm/entities/UserBilling';

@injectable()
class CreateUserBillingService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserBillingsRepository')
    private userBillingsRepository: IUserBillingsRepository,
  ) {}

  public async execute(user_id: string): Promise<UserBilling> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.usersRepository.save(user);

    const userBilling = await this.userBillingsRepository.findByUserId(user_id);

    return userBilling;
  }
}

export default CreateUserBillingService;
