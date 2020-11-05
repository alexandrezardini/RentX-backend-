import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRentalService from '@modules/rentals/services/CreateRentalService';

export default class RentalsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date } = request.body;

    const { car_id } = request.params;

    const client_id = request.user.id;

    const createRental = container.resolve(CreateRentalService);

    const rental = await createRental.execute({
      clientId: client_id,
      carId: car_id,
      startDate: start_date,
      endDate: end_date,
    });

    return response.json(rental);
  }
}
