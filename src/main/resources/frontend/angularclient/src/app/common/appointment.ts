import { User } from "./user";

export class Appointment {
    constructor(
        public appt_id: number,
        public patient_id: number,
        public patient: User,
        public doctor_id: number,
        public doctor: User,
        public date_visited: string,
        public timeslot: number,
        public diagnosis: string,
        public prescription: string
    ) {}
}
