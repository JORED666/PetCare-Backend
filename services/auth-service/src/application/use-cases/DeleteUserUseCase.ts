import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { DeleteUserRequest } from '../dtos/delete-user/DeleteUserRequest';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ id, rol }: DeleteUserRequest): Promise<void> {
    const user = await this.userRepository.findByIdAndRol(id, rol);
    if (!user) throw new Error('Usuario no encontrado');

    await this.userRepository.delete(id);
  }
}