import { injectable, inject } from 'tsyringe';
import { eachDayOfInterval } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IRentalsRepository from '../repositories/IRentalsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

import Rental from '../infra/typeorm/entities/Rental';

interface IRequest {
  clientId: string;
  carId: string;
  startDate: Date;
  endDate: Date;
}

@injectable()
class CreateRentalService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  public async execute({
    carId,
    startDate,
    endDate,
    clientId,
  }: IRequest): Promise<Rental> {
    const car = await this.carsRepository.findById(carId);

    const user = await this.usersRepository.findById(clientId);

    if (!car) throw new AppError('Car not found');

    if (!user) throw new AppError('User not found');

    const daysRental = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    const rental = await this.rentalsRepository.create({
      car_id: car.id,
      client_id: user.id,
      start_date: startDate,
      end_date: endDate,
      value: car.daily_value * daysRental.length,
    });

    return rental;
  }
}

export default CreateRentalService;
