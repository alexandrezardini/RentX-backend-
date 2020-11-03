import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarSpecServices from '@modules/cars/services/CreateCarSpecServices';

export default class CarSpecsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, icon } = request.body;

    const { car_id } = request.params;

    const createCarSpec = container.resolve(CreateCarSpecServices);

    const carSpec = await createCarSpec.execute({
      car_id,
      name,
      description,
      icon,
    });

    return response.json(carSpec);
  }
}
