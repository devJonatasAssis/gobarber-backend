import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { isEqual } from 'date-fns';
import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';

class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();
        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);
        return appointment;
    }
}

export default FakeAppointmentsRepository;
