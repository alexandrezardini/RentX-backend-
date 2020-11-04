import Car from '../infra/typeorm/entities/Car';
import ICreateCarDTO from '../dtos/ICreateCarDTO';

export default interface ICarsRepository {
  findAll(): Promise<Car[] | undefined>;
  findById(id: string): Promise<Car | undefined>;
  findByName(name: string): Promise<Car | undefined>;
  create(data: ICreateCarDTO): Promise<Car>;
  save(user: Car): Promise<Car>;
}
