import { createContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const [counts, setCounts] = useState({ wishlist: 0, cart: 0 });
    const [featured, setFeatured] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [wishlist, setWishlist] = useState([]);

    const handleNavigation = (page) => {
        navigate(page);
    }

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

    const fetchLength = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            const response = await axios.get('http://localhost:5555/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                setCounts({
                    cart: response.data.cartLength,
                    wishlist: response.data.wishListLength
                })
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    const calculateTotal = (cartItems) => {
        const total = cartItems.reduce((sum, item) => {
            const price = item.productId.price;
            const quantity = item.quantity;
            return sum + price * quantity;
        }, 0);

        setTotalPrice(total);
    };

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
            if (response.data.success) {
                setCart(response.data.cart);
                calculateTotal(response.data.cart);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (prodID) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:5555/user/addToCart',
                {
                    prodID,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCart(response.data.cart);
            setCounts(prevCounts => ({
                ...prevCounts,
                cart: response.data.cart.length
            }));
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    const deleteFromCart = async (prodID) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            const response = await axios.delete(
                `http://localhost:5555/user/cart/${prodID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                setCart(response.data.cart);
                calculateTotal(response.data.cart);
                setCounts(prevCounts => ({
                    ...prevCounts,
                    cart: response.data.cart.length
                }));
            }
        } catch (error) {
            console.error('Error deleting from cart:', error);
        }
    };

    const updateCart = async (prodID, change) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:5555/user/cart/updateQuantity',
                {
                    prodID,
                    change
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setCart(response.data.cart);
                calculateTotal(response.data.cart);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    const getWishList = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            const response = await axios.get('http://localhost:5555/user/wishlist', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                setWishlist(response.data.wishlist);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    const addToWishlist = async (prodID) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:5555/user/wishlist',
                {
                    prodID,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWishlist(response.data.wishlist);
            setCounts(prevCounts => ({
                ...prevCounts,
                wishlist: response.data.wishlist.length
            }));
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    }

    const deleteFromWishlist = async (prodID) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }
        try {
            const response = await axios.delete(
                `http://localhost:5555/user/wishlist/${prodID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                setWishlist(response.data.wishlist);
                setCounts(prevCounts => ({
                    ...prevCounts,
                    wishlist: response.data.wishlist.length
                }));
            }
        } catch (error) {
            console.error('Error deleting from wishlist:', error);
        }
    }

    const contextValue = {
        counts,
        featured,
        totalPrice,
        cart,
        wishlist,
        fetchLength,
        handleNavigation,
        handleSignUp,
        fetchFeaturedProducts,
        handleLogin,
        getCart,
        addToCart,
        deleteFromCart,
        updateCart,
        getWishList,
        addToWishlist,
        deleteFromWishlist
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;