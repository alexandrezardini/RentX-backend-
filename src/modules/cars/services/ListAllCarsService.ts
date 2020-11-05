import { injectable, inject } from 'tsyringe';

import ICarsRepository from '../repositories/ICarsRepository';
import ICarSpecsRepository from '../repositories/ICarSpecsRepository';

import Car from '../infra/typeorm/entities/Car';

@injectable()
class ListAllCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarSpecsRepository')
    private carSpecsRepository: ICarSpecsRepository,
  ) {}

  public async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.findAll();

    const carsWithSpecs = Promise.all(
      cars.map(async car => ({
        ...car,
        specs: await this.carSpecsRepository.findByCarId(car.id),
      })),
    );

    return carsWithSpecs;
  }
}

export default ListAllCarsService;
