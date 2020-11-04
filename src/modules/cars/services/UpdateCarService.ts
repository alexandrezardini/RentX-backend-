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
  car_id: string;
}

@injectable()
class UpdateCarService {
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
    car_id,
  }: IRequest): Promise<Car> {
    const checkUserIsAdmin = (await this.usersRepository.findById(user_id))
      .admin;

    if (!checkUserIsAdmin) {
      throw new AppError('User not authorized');
    }

    const car = await this.carsRepository.findById(car_id);

    if (!car) throw new AppError('Car not found');

    car.brand = brand;
    car.daily_value = daily_value;
    car.name = name;

    return this.carsRepository.save(car);
  }
}

export default UpdateCarService;
