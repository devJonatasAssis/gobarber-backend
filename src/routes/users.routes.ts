import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';

import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({ name, email, password });
        // delete user.password;
        return response.json(user);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

usersRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatar = new UpdateUserAvatarService();
            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename,
            });

            return response.json(user);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
);

export default usersRoutes;
