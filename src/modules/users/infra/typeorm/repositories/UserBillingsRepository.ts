import { getRepository, Repository } from 'typeorm';

import IUserBillingsRepository from '@modules/users/repositories/IUserBillingsRepository';
import ICreateBillingDTO from '@modules/users/dtos/ICreateBillingDTO';

import UserBilling from '../entities/UserBilling';

class UserBillingsRepository implements IUserBillingsRepository {
  private ormRepository: Repository<UserBilling>;

  constructor() {
    this.ormRepository = getRepository(UserBilling);
  }

  public async create(
    data: Omit<ICreateBillingDTO, 'cpf' | 'phone_number'>,
  ): Promise<UserBilling> {
    const userBilling = this.ormRepository.create(data);

    const user = await this.ormRepository.save(userBilling);

    return user;
  }
}

export default UserBillingsRepository;
