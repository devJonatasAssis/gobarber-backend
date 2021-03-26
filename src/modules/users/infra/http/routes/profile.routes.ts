import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.use(ensureAuthenticated);

profileRoutes.put('/', profileController.update);
profileRoutes.get('/', profileController.show);

export default profileRoutes;
