import { getRepository, Repository, Not } from 'typeorm';

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';

import Rental from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  public async create(rentalData: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create(rentalData);

    await this.ormRepository.save(rental);

    return rental;
  }
}

export default RentalsRepository;
