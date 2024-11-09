import { createContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const handleSignUp = async (signUpDetails) => {
        const { name, email, password, phone } = signUpDetails;
        const url = 'http://localhost:5555/auth/signup'
        const response = await axios.post(url, {
            name,
            email,
            password,
            phone
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);
        navigate('/');
    }

    const contextValue = {
        handleSignUp
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;