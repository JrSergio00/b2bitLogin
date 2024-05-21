import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthProvider/useAuth"
import { getUserLocalStorage, getUser } from "../../context/AuthProvider/util"
import Style from "./Profile.module.css"

async function getUserData() {
    const userLs = getUserLocalStorage()
    const token = userLs.token

    try {
        const user = await getUser(token)

        return user
    } catch (error) {
        return false
    }
}

const Profile = () => {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedUser = await getUserData();

            if (fetchedUser == false) {
                logout()
            }

            setUser(fetchedUser);
        };

        fetchData();
    }, []);

    const auth = useAuth()
    const navigate = useNavigate()

    const logout = async () => {
        auth.logout()
        navigate('/')
    }

    return (
        <div className={Style.container}>
            {user === null ? (
                <p className={Style.loading}>Loading user data...</p>
            ) : (
                <>
                    <header>
                        <button onClick={logout}>Logout</button>
                    </header>
                    <main>
                        <picture>
                            <p>Profile picture</p>
                            <img src={user.avatar.medium} alt="Profile picture" />
                        </picture>
                        <div>
                            <p>Your <b>Name</b></p>
                            <div>
                                <p>{user.name}</p>
                            </div>
                            <p>Your <b>E-mail</b></p>
                            <div>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    </main>
                </>
            )}
        </div>
    )
}

export default Profile