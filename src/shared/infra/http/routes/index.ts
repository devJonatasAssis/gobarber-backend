import { Router } from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/session.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
