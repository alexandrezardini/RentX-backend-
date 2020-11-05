import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';
import ICarSpecsRepository from '../repositories/ICarSpecsRepository';

import Car from '../infra/typeorm/entities/Car';
import CarSpec from '../infra/typeorm/entities/CarSpec';

interface IResponse {
  id: string;
  brand: string;
  daily_value: number;
  name: string;
  specs: CarSpec[];
}

@injectable()
class ListAllCarsByRangeValueService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarSpecsRepository')
    private carSpecsRepository: ICarSpecsRepository,
  ) {}

  public async execute(from: number, to: number): Promise<IResponse[]> {
    const cars = await this.carsRepository.findByValueRange(from, to);

    const carsWithSpecs = Promise.all(
      cars.map(async car => ({
        ...car,
        specs: await this.carSpecsRepository.findByCarId(car.id),
      })),
    );

    return carsWithSpecs;
  }
}

export default ListAllCarsByRangeValueService;
