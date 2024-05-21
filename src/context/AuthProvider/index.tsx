import {createContext, useEffect, useState} from "react"
import { IAuthProvider, IContext, IUser } from "./types"
import { LoginRequest, getUserLocalStorage, removeLocalStorage, setUserLocalStorage } from "./util"

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>()

    useEffect(() => {
        const user = getUserLocalStorage

        if(user) {
            setUser(user)
        }
    }, [])

    async function authenticate (email: string, password: string) {
        const response = await LoginRequest(email, password)
        const payload = {token: response.tokens.access, email}

        setUser(payload)
        setUserLocalStorage(payload)

        return response
    }
    
    function logout () {
        setUser(null)
        removeLocalStorage()
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}