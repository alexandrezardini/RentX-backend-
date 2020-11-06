import { number, string } from '@hapi/joi';

export default interface ICreateTransactionDTO {
  rental_id: string;
  transaction_id: string;
  status: string;
  authorization_code: string;
  brand: string;
  authorized_amount: number;
  tid: string;
}
