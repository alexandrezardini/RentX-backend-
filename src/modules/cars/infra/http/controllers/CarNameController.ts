import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllCarsByNameService from '@modules/cars/services/ListAllCarsByNameService';

export default class CarNameController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const listCarDayAvailabilityService = container.resolve(
      ListAllCarsByNameService,
    );

    const availability = await listCarDayAvailabilityService.execute(
      String(name),
    );

    return response.json(availability);
  }
}
