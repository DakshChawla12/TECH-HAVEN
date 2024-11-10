import { createContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const [featured, setFeatured] = useState([]);

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

    const handleLogin = async (loginDetails) => {
        const { email, password } = loginDetails;
        const url = 'http://localhost:5555/auth/login'
        const response = await axios.post(url, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { success, jwtToken } = response.data;
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('helllo', 1234567890);
        navigate('/');
    }

    const fetchFeaturedProducts = async () => {
        const url = 'http://localhost:5555/products/featured';
        const response = await axios.get(url);
        const data = response.data;
        const { success, featuredProducts } = data;
        if (success) {
            setFeatured(featuredProducts);
        }
    }

    const getCart = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5555/user/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('User Cart:', response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };


    const contextValue = {
        featured,
        handleSignUp,
        fetchFeaturedProducts,
        handleLogin,
        getCart
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;