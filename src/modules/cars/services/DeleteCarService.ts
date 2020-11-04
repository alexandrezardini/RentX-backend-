import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Car from '../infra/typeorm/entities/Car';

@injectable()
class DeleteCarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute(car_id: string, user_id: string): Promise<void> {
    const checkUserIsAdmin = (await this.usersRepository.findById(user_id))
      .admin;

    if (!checkUserIsAdmin) {
      throw new AppError('User not authorized');
    }
    await this.carsRepository.delete(car_id);
  }
}

export default DeleteCarService;
