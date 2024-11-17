import { Dayjs } from "dayjs";
import { atom } from "recoil";

interface IDoctor {
  name: string;
  contact: string;
  location: string;
  specialty: string;
  image: string;
}

interface IAppointment {
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
