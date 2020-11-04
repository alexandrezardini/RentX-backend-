import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, isAfter, getDate, isWithinInterval } from 'date-fns';

import Rental from '../infra/typeorm/entities/Rental';

import IRentalsRepository from '../repositories/IRentalsRepository';

interface IRequest {
  car_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListCarDayAvailabilityService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  public async execute({ car_id, year, month }: IRequest): Promise<IResponse> {
    const rentals = await this.rentalsRepository.findAllInDayFromProvider({
      car_id,
      year,
      month,
    });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const startsInDay = rentals.filter(appointment => {
        return getDate(appointment.start_date) === day;
      });

      const EndsInDay = rentals.filter(appointment => {
        return getDate(appointment.end_date) === day;
      });

      const available = rentals.reduce(
        (acc, cur) =>
          !isWithinInterval(compareDate, {
            start: cur.start_date,
            end: cur.end_date,
          }),
        true,
      );

      return {
        day,
        available: available,
      };
    });

    return availability;
  }
}

export default ListCarDayAvailabilityService;
