export default interface IHashProvider {
  generateHash(payload: string, bits: number): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
