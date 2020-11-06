import { getRepository, Repository, Not, Raw } from 'typeorm';

import ITransactionsRepository from '@modules/payments/repositories/ITransactionsRepository';
import ICreateTransactionDTO from '@modules/payments/dtos/ICreateTransactionDTO';

import Transaction from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(rentalData: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create(rentalData);

    await this.ormRepository.save(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
