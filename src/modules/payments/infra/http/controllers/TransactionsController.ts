import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTransactionsService from '@modules/payments/services/CreateTransactionsService';

export default class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { card_hash } = request.body;

    const user_id = request.user.id;
    const createTransaction = container.resolve(CreateTransactionsService);

    const transaction = await createTransaction.execute({
      user_id,
      card_hash,
    });

    return response.json({
      status: transaction.status,
      transaction_code: transaction.authorization_code,
      transaction_value: transaction.authorized_amount,
      transaction_brand_cars: transaction.brand,
    });
  }
}
