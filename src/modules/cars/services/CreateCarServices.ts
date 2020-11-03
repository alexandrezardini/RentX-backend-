import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Car from '../infra/typeorm/entities/Car';

interface IRequest {
  name: string;
  brand: string;
  daily_value: number;
  user_id: string;
}

@injectable()
class CreateCarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({
    name,
    brand,
    daily_value,
    user_id,
  }: IRequest): Promise<Car> {
    const checkUserIsAdmin = (await this.usersRepository.findById(user_id))
      .admin;

    if (!checkUserIsAdmin) {
      throw new AppError('User not authorized');
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      daily_value,
    });

    return car;
  }
}

export default CreateCarService;
