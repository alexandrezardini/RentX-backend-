import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Car from '../infra/typeorm/entities/Car';

@injectable()
class ListAllCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.findAll();

    return cars;
  }
}

export default ListAllCarsService;
