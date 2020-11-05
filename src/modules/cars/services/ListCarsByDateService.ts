import { injectable, inject } from 'tsyringe';
import { isWithinInterval, isSameDay } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '../repositories/ICarsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import ICarSpecsRepository from '../repositories/ICarSpecsRepository';

import Car from '../infra/typeorm/entities/Car';
import CarSpec from '../infra/typeorm/entities/CarSpec';

interface IRequest {
  day: number;
  month: number;
  year: number;
}

interface IResponse {
  id: string;
  brand: string;
  daily_value: number;
  name: string;
  specs: CarSpec[];
}

@injectable()
class ListCarsByDateService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarSpecsRepository')
    private carSpecsRepository: ICarSpecsRepository,
  ) {}

  public async execute({ day, year, month }: IRequest): Promise<IResponse[]> {
    const currentDate = new Date(year, month - 1, day);
    const rentals = await this.rentalsRepository.findAll();

    const available = rentals.map(rental => {
      const isInStartDate = isSameDay(currentDate, rental.start_date);

      const isInEndDate = isSameDay(currentDate, rental.end_date);

      const interval = isWithinInterval(currentDate, {
        start: rental.start_date,
        end: rental.end_date,
      });

      if (isInStartDate || isInEndDate || interval) {
        return rental.car_id;
      }

      return undefined;
    });

    const filteredCars = available.filter(notFalse => notFalse);

    if (filteredCars[0] === undefined) {
      const allCars = await this.carsRepository.findAll();
      const carsWithSpecs = Promise.all(
        allCars.map(async car => ({
          ...car,
          specs: await this.carSpecsRepository.findByCarId(car.id),
        })),
      );

      return carsWithSpecs;
    }

    const carsByDay = Promise.all(
      filteredCars.map(async car_id => {
        const cars = await this.carsRepository.findNot(car_id);

        return Promise.all(
          cars.map(
            async car =>
              ({
                ...car,
                specs: await this.carSpecsRepository.findByCarId(car.id),
              } as IResponse),
          ),
        );
      }),
    );

    const cars = (await carsByDay)[0];

    return cars;
  }
}

export default ListCarsByDateService;
