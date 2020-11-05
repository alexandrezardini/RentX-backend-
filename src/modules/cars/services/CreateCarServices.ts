import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';
import ICarSpecsRepository from '../repositories/ICarSpecsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Car from '../infra/typeorm/entities/Car';
import CarSpec from '../infra/typeorm/entities/CarSpec';

interface IRequest {
  name: string;
  brand: string;
  daily_value: number;
  user_id: string;
  clutch: string;
  gas_type: string;
}

interface IResponse {
  car: Car;
  specs: CarSpec[];
}

@injectable()
class CreateCarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarSpecsRepository')
    private carSpecsRepository: ICarSpecsRepository,
  ) {}

  public async execute({
    name,
    brand,
    daily_value,
    user_id,
    clutch,
    gas_type,
  }: IRequest): Promise<IResponse> {
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

    const carClutchSpec = await this.carSpecsRepository.create({
      car_id: car.id,
      name: 'Câmbio',
      description: clutch,
      icon: 'clutch',
    });

    const carGasTypeSpec = await this.carSpecsRepository.create({
      car_id: car.id,
      name: 'Combustível',
      description: gas_type,
      icon: 'gas',
    });

    const createdCar = { car, specs: [carClutchSpec, carGasTypeSpec] };

    return createdCar;
  }
}

export default CreateCarService;
