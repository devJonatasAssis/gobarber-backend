import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });

    it('Envio de email para resetar a senha', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'Jonatas de Assis Silva',
            email: 'jonatas@gmail.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'jonatas@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('Verificando se o usuário não existe', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'jonatas@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Testar se gera um token para reset de senha', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Jonatas de Assis Silva',
            email: 'jonatas@gmail.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'jonatas@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
