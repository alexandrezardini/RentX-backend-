import Car from '../infra/typeorm/entities/Car';
import ICreateCarDTO from '../dtos/ICreateCarDTO';

export default interface ICarsRepository {
  findAll(): Promise<Car[] | undefined>;
  findAllByIds(id: string[]): Promise<Car[] | undefined>;
  findNot(id: String): Promise<Car[] | undefined>;
  findById(id: string): Promise<Car | undefined>;
  findByValueRange(from: number, to: number): Promise<Car[] | undefined>;
  findByName(name: string): Promise<Car | undefined>;
  delete(car_id: string): Promise<void>;
  create(data: ICreateCarDTO): Promise<Car>;
  save(user: Car): Promise<Car>;
}
