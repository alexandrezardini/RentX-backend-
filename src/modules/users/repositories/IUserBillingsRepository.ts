import UserBilling from '../infra/typeorm/entities/UserBilling';
import ICreateBillingDTO from '../dtos/ICreateBillingDTO';

export default interface IUserTokenRepository {
  create(
    user_id: Omit<ICreateBillingDTO, 'cpf' | 'phone_number'>,
  ): Promise<UserBilling>;
  findByUserId(user_id: string): Promise<UserBilling>;
}
