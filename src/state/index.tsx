import { atom } from "recoil";

interface IDoctor {
    name: string;
    contact: string;
    location: string;
    specialty: string;
    image: string;
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