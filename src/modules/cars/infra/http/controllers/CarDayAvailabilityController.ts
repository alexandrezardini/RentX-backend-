import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCarsByDateService from '@modules/cars/services/ListCarsByDateService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.query;

    const listCarDayAvailabilityService = container.resolve(
      ListCarsByDateService,
    );

    const availability = await listCarDayAvailabilityService.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
