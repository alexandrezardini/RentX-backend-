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
class ListAllCarsByNameService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarSpecsRepository')
    private carSpecsRepository: ICarSpecsRepository,
  ) {}

  public async execute(carName: string): Promise<IResponse> {
    const car = await this.carsRepository.findByName(carName);

    const carSpecs = await this.carSpecsRepository.findByCarId(car.id);

    const { id, brand, daily_value, name } = car;

    const carWithSpecs = { id, brand, daily_value, name, specs: carSpecs };

    return carWithSpecs;
  }
}

export default ListAllCarsByNameService;
