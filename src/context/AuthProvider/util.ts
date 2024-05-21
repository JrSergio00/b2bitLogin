import { api } from "../../services/api";
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem("user", JSON.stringify(user))
}
export function getUserLocalStorage() {
    const jsonUser = localStorage.getItem("user")

    if (!jsonUser) {
        return null
    }

    const user = JSON.parse(jsonUser)

    return user ?? null
}
export function removeLocalStorage() {
    localStorage.removeItem("user")
}

export async function LoginRequest(email: string, password: string) {
    try {
        const request = await api.post('login/', {
            "email": email,
            "password": password
        })

        return request.data;
    } catch (error) {
        return null;
    }
}

export async function getUser(token: string) {
    try {
        const response = await api.get('profile/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}