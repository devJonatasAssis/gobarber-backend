import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';

const routes = Router();

routes.get('appointments', appointmentsRoutes);
routes.post('appointments', appointmentsRoutes);

export default routes;
