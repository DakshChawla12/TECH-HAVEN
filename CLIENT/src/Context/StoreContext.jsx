import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleFailure } from '../utils';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const [allProducts, setAllProducts] = useState([]);
    const [counts, setCounts] = useState({ wishlist: 0, cart: 0 });
    const [featured, setFeatured] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: ''
    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getCart(); // Fetch the cart when the user is logged in
        }
    }, []);

    const getAllProducts = async () => {
        const url = "http://localhost:5555/products";
        try {
            const response = await axios.get(url);
            const { success, products, message } = response.data;
            if (success) {
                setAllProducts(products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserDetails = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found');
            handleFailure("please login to view your details");
            return;
        }
        try {
            const response = await axios.get('http://localhost:5555/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                setProfile({
                    name: response.data.userDetails.name,
                    email: response.data.userDetails.email,
                    phone: response.data.userDetails.phone
                })
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    const changeUserDetails = async (details) => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No token found');
            handleFailure("Please login to view your details");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5555/user/profile",
                details,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                setProfile({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    phone: response.data.user.phone,
                });
                handleSuccess("Details Updated");
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
            }
        } catch (error) {
            handleFailure("Failed to update details");
            console.error('Error updating details:', error);
        }
    };


    const fetchDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5555/products/${id}`);
            setProduct(response.data.product);
            console.log(response.data.product);
        } catch (err) {
            console.log(err)
        }
    };

    const handleNavigation = (page) => {
        navigate(page);
    }

    const handleSignUp = async (signUpDetails) => {
        const { name, email, password, phone } = signUpDetails;
        const url = 'http://localhost:5555/auth/signup';
        try {
            const response = await axios.post(
                url,
                { name, email, password, phone },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const { success } = response.data;
            if (success) {
                handleSuccess("registered successfully");
                navigate('/login');
            } else {
                handleFailure("failed to register");
            }
        } catch (error) {
            handleFailure("failed to register");
        }
    };

    const handleLogin = async (loginDetails) => {
        const { email, password } = loginDetails;
        const url = 'http://localhost:5555/auth/login';

        try {
            const response = await axios.post(url, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { success, jwtToken, name } = response.data;
            if (success) {
                handleSuccess("logged in successfully");
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('name', name);
                await fetchLength();
                navigate('/');
            } else {
                handleFailure("failed to login");
            }
        } catch (error) {
            handleFailure("failed to login");
        }
    };

    const fetchFeaturedProducts = async () => {
        try {
            const url = 'http://localhost:5555/products/featured';
            const response = await axios.get(url);
            const { success, featuredProducts } = response.data;
            if (success) {
                setFeatured(featuredProducts);
            } else {
            }
        } catch (err) {
        } finally {
            setLoading(false); // This sets loading to false when fetching ends
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
            handleFailure("please login to add item to cart");
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
            const { success, message } = response.data;
            if (success) {
                handleSuccess(message);
                setCart(response.data.cart);
                setCounts(prevCounts => ({
                    ...prevCounts,
                    cart: response.data.cart.length
                }));
            } else {
                handleFailure(message);
            }
        } catch (error) {
            handleFailure(error.response?.data?.message || 'Failed to add item to cart');
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
            const { success, message } = response.data;
            if (success) {
                handleSuccess(message);
                setCart(response.data.cart);
                calculateTotal(response.data.cart);
                setCounts(prevCounts => ({
                    ...prevCounts,
                    cart: response.data.cart.length
                }));
            } else {
                handleFailure(message);
            }
        } catch (error) {
            handleFailure(message);
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
            handleFailure("please login to add item to wishlist");
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
            handleFailure("please login to add item to wishlist");
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
            const { success, message } = response.data;
            if (success) {
                console.log(message);
                handleSuccess(message);
                setWishlist(response.data.wishlist);
                setCounts(prevCounts => ({
                    ...prevCounts,
                    wishlist: response.data.wishlist.length
                }));
            } else {
                console.log(message);
                handleFailure(message);
            }
        } catch (error) {
            handleFailure(error.response?.data?.message || 'Failed to add item to wishlist');
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
            const { success, message } = response.data;
            if (success) {
                handleSuccess(message);
                setWishlist(response.data.wishlist);
                setCounts(prevCounts => ({
                    ...prevCounts,
                    wishlist: response.data.wishlist.length
                }));
            } else {
                handleFailure(message);
            }
        } catch (error) {
            handleFailure(message);
            console.error('Error deleting from wishlist:', error);
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        setCounts({
            cart: 0, wishlist: 0
        })
        handleSuccess("logged out successfully");
        navigate('/login');
    }

    const contextValue = {
        allProducts,
        counts,
        featured,
        totalPrice,
        cart,
        wishlist,
        loading,
        product,
        profile,
        getAllProducts,
        fetchDetails,
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
        deleteFromWishlist,
        handleLogout,
        getUserDetails,
        changeUserDetails
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;