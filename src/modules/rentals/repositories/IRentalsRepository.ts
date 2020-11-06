import Rental from '../infra/typeorm/entities/Rental';
import ICreateRentalDTO from '../dtos/ICreateRentalDTO';
import IFindByDateDTO from '../dtos/IFindByDateDTO';

export default interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findByDate(data: IFindByDateDTO): Promise<Rental>;
  findAll(): Promise<Rental[]>;
  findByUserId(user_id: string): Promise<Rental[]>;
}
