import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();
    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });
    return response.json({ user, token });
});

export default sessionsRoutes;
