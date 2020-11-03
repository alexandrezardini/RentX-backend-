import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICarSpecsRepository from '../repositories/ICarSpecsRepository';
import ICarsRepository from '../repositories/ICarsRepository';

import CarSpec from '../infra/typeorm/entities/CarSpec';

interface IRequest {
  name: string;
  description: string;
  icon: string;
  car_id: string;
}

@injectable()
class CreateCarSpecService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarSpecsRepository')
    private carSpecsRepository: ICarSpecsRepository,
  ) {}

  public async execute({
    name,
    description,
    icon,
    car_id,
  }: IRequest): Promise<CarSpec> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) throw new AppError('Car not found');

    const carSpec = await this.carSpecsRepository.create({
      car_id: car.id,
      name,
      description,
      icon,
    });

    return carSpec;
  }
}

export default CreateCarSpecService;
