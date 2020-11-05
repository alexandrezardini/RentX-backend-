import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';
import ICarSpecsRepository from '../repositories/ICarSpecsRepository';

import Car from '../infra/typeorm/entities/Car';
import CarSpec from '../infra/typeorm/entities/CarSpec';

interface IResponse {
  car: Car;
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

  public async execute(name: string): Promise<IResponse> {
    const car = await this.carsRepository.findByName(name);

    const carSpecs = await this.carSpecsRepository.findByCarId(car.id);

    const carWithSpecs = { car, specs: carSpecs };

    return carWithSpecs;
  }
}

export default ListAllCarsByNameService;
