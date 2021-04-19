

import { EntityRepository, Repository } from 'typeorm'
import Appointment from '../models/Appointment'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  async findByDate(date: Date): Promise<Appointment | null> {
    const appointment = await this.findOne({ date })

    return appointment || null
  }
}
export default AppointmentsRepository
