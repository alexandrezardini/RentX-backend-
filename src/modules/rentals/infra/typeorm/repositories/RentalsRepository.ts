import { getRepository, Repository, Not, Raw } from 'typeorm';

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IFindAllInDayFromCarDTO from '@modules/rentals/dtos/IFindAllInDayFromCarDTO';

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

  public async findAllInDayFromProvider({
    car_id,
    month,
    year,
  }: IFindAllInDayFromCarDTO): Promise<Rental[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const rentals = await this.ormRepository.find({
      where: {
        car_id,
        start_date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
        end_date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
      relations: ['car'],
    });

    return rentals;
  }
}

export default RentalsRepository;
