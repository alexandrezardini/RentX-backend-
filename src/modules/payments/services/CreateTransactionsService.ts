import { injectable, inject } from 'tsyringe';
import pagarme from 'pagarme';

import AppError from '@shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';

import ITransactionsRepository from '../repositories/ITransactionsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserBillingsRepository from '@modules/users/repositories/IUserBillingsRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
  card_hash: string;
}

@injectable()
class CreateTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('UserBillingsRepository')
    private userBillingsRepository: IUserBillingsRepository,
  ) {}

  public async execute({ user_id, card_hash }: IRequest): Promise<Transaction> {
    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });

    const user = await this.usersRepository.findById(user_id);

    const userBilling = await this.userBillingsRepository.findByUserId(user_id);

    const rentals = await this.rentalsRepository.findByUserId(user.id);

    const {
      city,
      neighborhood,
      state,
      street,
      street_number,
      zipcode,
    } = userBilling;

    const rental = rentals[0];

    const amount = String(Number(rental.value) * 100);

    await this.usersRepository.save(user);

    const pagarmeTransaction = await client.transactions.create({
      amount: parseInt(amount, 10),
      card_hash,
      customer: {
        external_id: user.id,
        name: user.name,
        type: 'individual',
        country: 'br',
        email: user.email,
        documents: [
          {
            type: 'cpf',
            number: user.cpf,
          },
        ],
        phone_numbers: [user.phone_number],
      },
      billing: {
        name: user.name,
        address: {
          country: 'br',
          state,
          city,
          neighborhood,
          street,
          street_number,
          zipcode,
        },
      },
      items: [
        {
          id: rental.id,
          title: 'Red pill',
          unit_price: parseInt(amount, 10),
          quantity: 1,
          tangible: false,
        },
      ],
    });

    const transaction = await this.transactionsRepository.create({
      rental_id: rental.id,
      transaction_id: pagarmeTransaction.id,
      status: pagarmeTransaction.status,
      authorization_code: pagarmeTransaction.authorization_code,
      brand: pagarmeTransaction.card.brand,
      authorized_amount: pagarmeTransaction.authorized_amount,
      tid: pagarmeTransaction.tid,
    });

    return transaction;
  }
}

export default CreateTransactionsService;
