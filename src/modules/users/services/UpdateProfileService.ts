import path from 'path';
import fs from 'fs';
import User from '../infra/typeorm/entities/User';
import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password: string;
    password: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        old_password,
        password,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        const userWithUpdateEmail = await this.usersRepository.findByEmail(
            email,
        );

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError('Email já está em uso.');
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError(
                'Você precisa informar a senha antiga para definir uma nova senha',
            );
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );
            if (!checkOldPassword) {
                throw new AppError('Senha antiga não confere');
            }
            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateProfileService;
