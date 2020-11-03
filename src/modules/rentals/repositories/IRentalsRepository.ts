import Rental from '../infra/typeorm/entities/Rental';
import ICreateRentalDTO from '../dtos/ICreateRentalDTO';

export default interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
}
