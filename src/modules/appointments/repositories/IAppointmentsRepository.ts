import ICreateAppointmentDTO from '../dtos/ICreateAppointmentsDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(data: Date): Promise<Appointment | undefined>;
}
