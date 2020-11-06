import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserBillingService from '@modules/users/services/CreateUserBillingService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      state,
      city,
      neighborhood,
      street,
      street_number,
      zipcode,
      cpf,
      phone_number,
    } = request.body;

    const user_id = request.user.id;

    const createUserBilling = container.resolve(CreateUserBillingService);

    const userBilling = await createUserBilling.execute({
      state,
      city,
      neighborhood,
      street,
      street_number,
      zipcode,
      cpf,
      user_id,
      phone_number,
    });

    return response.json(userBilling);
  }
}
