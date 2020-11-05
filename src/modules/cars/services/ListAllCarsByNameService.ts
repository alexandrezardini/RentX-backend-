import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';

import Car from '../infra/typeorm/entities/Car';

@injectable()
class ListAllCarsByNameService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute(name: string): Promise<Car> {
    const car = await this.carsRepository.findByName(name);

    return car;
  }
}

export default ListAllCarsByNameService;
