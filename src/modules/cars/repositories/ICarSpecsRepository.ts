import CarSpec from '../infra/typeorm/entities/CarSpec';
import ICreateCarSpecDTO from '../dtos/ICreateCarSpecDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<CarSpec | undefined>;
  findByName(name: string): Promise<CarSpec | undefined>;
  create(data: ICreateCarSpecDTO): Promise<CarSpec>;
  save(user: CarSpec): Promise<CarSpec>;
}
