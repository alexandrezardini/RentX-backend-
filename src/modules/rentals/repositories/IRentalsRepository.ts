import Rental from '../infra/typeorm/entities/Rental';
import ICreateRentalDTO from '../dtos/ICreateRentalDTO';
import IFindAllInDayFromCarDTO from '../dtos/IFindAllInDayFromCarDTO';

export default interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findAllInDayFromProvider(data: IFindAllInDayFromCarDTO): Promise<Rental[]>;
}
