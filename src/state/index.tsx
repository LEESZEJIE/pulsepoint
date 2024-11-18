import { Dayjs } from "dayjs";
import { atom } from "recoil";

export interface IDoctor {
  name: string;
  contact: string;
  location: string;
  specialty: string;
  image: string;
}

export interface IAppointment {
  time: Dayjs | null;
  date: Dayjs | undefined;
  type: 'teleconsultation' | 'clinic-visit';
}

export const selectedDoctorState = atom<IDoctor>({
  key: 'selectedDoctorState',
  default: {
    name: '',
    contact: '',
    location: '',
    specialty: '',
    image: '',
  }
})

export const appointmentInfoState = atom<IAppointment>({
  key: 'selectedDoctorState',
  default: {
    time: null,
    date: undefined,
    type: 'teleconsultation',
  }
})

export const appointmentsListState = atom<(IDoctor & IAppointment)[]>({
  key: 'appointmentsListState',
  default: []
})
