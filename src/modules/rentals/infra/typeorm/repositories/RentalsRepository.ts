import { getRepository, Repository, Not, Raw } from 'typeorm';

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

  public async findByDate({ day, month, year }): Promise<Rental> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const rental = await this.ormRepository.findOne({
      where: {
        start_date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
        end_date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['car'],
    });

    return rental;
  }

  public async findAll(): Promise<Rental[]> {
    const rentals = await this.ormRepository.find({ relations: ['car'] });

    return rentals;
  }
}

export default RentalsRepository;
