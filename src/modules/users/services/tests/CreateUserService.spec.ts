import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from '../CreateUserService';

describe('Criação de Usuário', () => {
    it('Deve criar um novo usuário', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(fakeUsersRepository);

        const user = await createUser.execute({
            name: 'Gabriela',
            email: 'gabriela@hotmail.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });
});
