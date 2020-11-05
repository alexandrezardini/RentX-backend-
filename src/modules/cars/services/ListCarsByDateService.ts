import { injectable, inject } from 'tsyringe';
import { isWithinInterval } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

import Car from '../infra/typeorm/entities/Car';

interface IRequest {
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListCarsByDateService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  public async execute({ day, year, month }: IRequest): Promise<Car[]> {
    const currentDate = new Date(year, month - 1, day);
    const rentals = await this.rentalsRepository.findAll();

    const available = rentals.map(rental => {
      const interval = isWithinInterval(currentDate, {
        start: rental.start_date,
        end: rental.end_date,
      });

      return interval && rental.car_id;
    });

    const filteredCars = available.filter(notFalse => notFalse);

    if (filteredCars.length === 0) {
      const allCars = await this.carsRepository.findAll();
      return allCars;
    }

    const carsByDay = Promise.all(
      filteredCars.map(async car => {
        const cars = await this.carsRepository.findNot(car);

        return cars;
      }),
    );

    const cars = (await carsByDay)[0];

    return cars;
  }
}

export default ListCarsByDateService;
