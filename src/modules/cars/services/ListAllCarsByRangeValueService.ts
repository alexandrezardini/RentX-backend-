import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';

import Car from '../infra/typeorm/entities/Car';

@injectable()
class ListAllCarsByRangeValueService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute(from: number, to: number): Promise<Car[]> {
    const cars = await this.carsRepository.findByValueRange(from, to);

    return cars;
  }
}

export default ListAllCarsByRangeValueService;
