import { getRepository, Repository, Not } from 'typeorm';

import ICarSpecsRepository from '@modules/cars/repositories/ICarSpecsRepository';
import ICreateCarSpecDTO from '@modules/cars/dtos/ICreateCarSpecDTO';

import CarSpec from '../entities/CarSpec';

class CarSpecsRepository implements ICarSpecsRepository {
  private ormRepository: Repository<CarSpec>;

  constructor() {
    this.ormRepository = getRepository(CarSpec);
  }

  public async findById(id: string): Promise<CarSpec | undefined> {
    const car = await this.ormRepository.findOne(id);

    return car;
  }

  public async findByName(name: string): Promise<CarSpec | undefined> {
    const car = await this.ormRepository.findOne({
      where: { name },
    });

    return car;
  }

  public async create(carData: ICreateCarSpecDTO): Promise<CarSpec> {
    const car = this.ormRepository.create(carData);

    await this.ormRepository.save(car);

    return car;
  }

  public async save(user: CarSpec): Promise<CarSpec> {
    return this.ormRepository.save(user);
  }
}

export default CarSpecsRepository;
