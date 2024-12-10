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
  isCompleted: boolean;
}

export type IUser = {
  fullname: string;
  nric: string;
  contact: string;
  password: string;
  address: string;
}

export type IScheduledAppointment = IDoctor & IAppointment & { id: number };

export const isSidebarOpenState = atom({
  key: 'isSidebarOpenState',
  default: false,
})

export const usersListState = atom<IUser[]>({
  key: 'usersListState',
  default: [
    {
      fullname: 'test123',
      password: '48355',
      nric: '011111-10-1111',
      contact: '012-345 6789',
      address: 'TQG 2028 Go Diamond City'
    }
  ],
});

export const loggedInUserState = atom<IUser | null>({
  key: 'loggedInUserState',
  default: null
});

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
    isCompleted: false
  }
})

export const appointmentsListState = atom<IScheduledAppointment[]>({
  key: 'appointmentsListState',
  default: []
})

export const isRescheduleState = atom({
  key: 'isRescheduleState',
  default: false
});
