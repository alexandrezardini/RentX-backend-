import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllCarsByRangeValueService from '@modules/cars/services/ListAllCarsByRangeValueService';

export default class CarValueRangeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { from, to } = request.query;

    const listCarDayAvailabilityService = container.resolve(
      ListAllCarsByRangeValueService,
    );

    const availability = await listCarDayAvailabilityService.execute(
      Number(from),
      Number(to),
    );

    return response.json(availability);
  }
}
