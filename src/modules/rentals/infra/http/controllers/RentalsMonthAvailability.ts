import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCarDayAvailabilityService from '@modules/rentals/services/ListCarDayAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const { month, year } = request.query;

    const listCarDayAvailabilityService = container.resolve(
      ListCarDayAvailabilityService,
    );

    const availability = await listCarDayAvailabilityService.execute({
      car_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
