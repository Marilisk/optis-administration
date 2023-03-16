import instance from '../api';
import { IUser } from './../../../types/types';


export async function getUser(userId: string, setUser: (arg: IUser) => void) {
    const response = await instance.get(`/user/${userId}`)
    if (response.data) {
        setUser(response.data)
    }
}