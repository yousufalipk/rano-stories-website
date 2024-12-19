import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {

    const [isAuth, setAuth] = useState(true);

    return (
        <UserContext.Provider value={{
            isAuth,
            setAuth
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;