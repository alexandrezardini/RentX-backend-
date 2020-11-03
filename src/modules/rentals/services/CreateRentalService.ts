import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRentalsRepository from '../repositories/IRentalsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

import Rental from '../infra/typeorm/entities/Rental';

interface IRequest {
  client_id: string;
  car_id: string;
  start_date: Date;
  end_date: Date;
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
    car_id,
    start_date,
    end_date,
    client_id,
  }: IRequest): Promise<Rental> {
    const car = await this.carsRepository.findById(car_id);

    const user = await this.usersRepository.findById(client_id);

    if (!car) throw new AppError('Car not found');

    if (!user) throw new AppError('User not found');

    const rental = await this.rentalsRepository.create({
      car_id: car.id,
      client_id: user.id,
      start_date,
      end_date,
    });

    return rental;
  }
}

export default CreateRentalService;
