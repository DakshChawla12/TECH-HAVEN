import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleFailure } from '../utils';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const [adminProducts, setAdminProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
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
    const [allOrders, setAllOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getCart(); // Fetch the cart when the user is logged in
        }
    }, []);

    const getAdminProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5555/products/allProducts`);
            setAdminProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getAllProducts = async (page = 1) => {
        try {
            const response = await axios.get(`http://localhost:5555/products?page=${page}`);
            setAllProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

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
            const { success, jwtToken, name, isAdmin, phone, useremail } = response.data;
            if (success) {
                handleSuccess("logged in successfully");
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('name', name);
                localStorage.setItem('phone', phone);
                localStorage.setItem('email', useremail);
                localStorage.setItem('isAdmin', isAdmin);
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

    const editProduct = async (prodID, productData) => {
        const url = `http://localhost:5555/products/${prodID}`;

        // Prepare the payload for the PATCH request
        const dataToSend = {
            name: productData.name,
            price: productData.price,
            inStock: productData.inStock,
            description: productData.description,
        };

        // Only add rating to the payload if it is provided
        if (productData.rating !== undefined && productData.rating !== "") {
            dataToSend.rating = productData.rating;
        }

        // Get the token from localStorage
        const token = localStorage.getItem('token');

        try {
            const response = await axios.patch(
                url,
                dataToSend,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Send token in header
                    },
                }
            );
            const { success, products } = response.data;
            if (success) {
                handleSuccess("Product edited successfully");
                setAllProducts(products);
            } else {
                handleFailure("Failed to edit product");
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            handleFailure("Failed to edit product");
        }
    };

    const deleteProduct = async (prodID) => {
        const url = `http://localhost:5555/products/${prodID}`;

        // Get the token from localStorage
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Send token in header
                    },
                }
            );
            const { success, products } = response.data;
            if (success) {
                handleSuccess("Product deleted successfully");
                setAllProducts(products);
            } else {
                handleFailure("Failed to delete product");
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            handleFailure("Failed to delete product");
        }
    };


    const addProduct = async (formData) => {
        const categoriesArray = formData.category.split(' ');
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('inStock', formData.inStock);
        data.append('description', formData.description);
        data.append('category', JSON.stringify(categoriesArray));
        Array.from(formData.images).forEach((file, index) => {
            data.append('images', file);
        });

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5555/products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const { success, products } = response.data;
            if (success) {
                handleSuccess("Product Added successfully");
                setAllProducts(products);
            } else {
                handleFailure("Failed to add product");
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            handleFailure("Failed to add product");
        }
    };

    const handleFilter = async (filter, page = 1) => {
        try {
            const response = await axios.post(
                `http://localhost:5555/products/filter?page=${page}&limit=4`,
                { filter },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const { success, products, totalPages } = response.data;
            if (success) {
                setAllProducts(products);
                setTotalPages(totalPages);
                setCurrentPage(page);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const checkOutHandler = async (amount, shippingAddress) => {
        const token = localStorage.getItem('token');
        if (!token) {
            handleFailure("Please login to place an order");
            return;
        }
        if (!shippingAddress || shippingAddress === '') {
            handleFailure("please enter a valid address");
            return
        }
        try {
            const { data: { key } } = await axios.get("http://localhost:5555/getKey");
            const { data: { order } } = await axios.post("http://localhost:5555/payment/checkout", { amount });
            const name = localStorage.getItem('name');
            const phone = localStorage.getItem('phone');
            const email = localStorage.getItem('email');
            const options = {
                key,
                amount: order.amount,
                currency: 'INR',
                name: 'Daksh',
                description: 'Test Transaction',
                order_id: order.id,
                prefill: {
                    name,
                    email,
                    contact: phone,
                },
                theme: {
                    color: '#F37254',
                },
                handler: async function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    console.log("Payment Details:", response);

                    try {
                        const paymentResponse = await axios.post(
                            "http://localhost:5555/payment/paymentVerification",
                            {
                                order_id: razorpay_order_id,
                                razorpay_payment_id,
                                razorpay_signature,
                                cart,
                                totalAmount: amount,
                                shippingAddress: "#493 sector 15",
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if (paymentResponse.data.success) {
                            handleSuccess("order placed successfully");
                            setCounts(prevCounts => ({
                                ...prevCounts,
                                cart: 0
                            }));
                            setCart([]);
                        } else {
                            handleFailure("failed to place order");
                        }
                    } catch (error) {
                        console.error("Error during payment verification:", error);
                        navigate('/order-failure'); // Redirect on server error
                    }
                },
            };

            const rzp = new Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    const fetchAllOrders = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        try {
            const response = await axios.get('http://localhost:5555/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { orders, success } = response.data;
            if (success) {
                setAllOrders(orders);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUserOrders = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        try {
            const response = await axios.get('http://localhost:5555/orders/user-orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { orders, success } = response.data;
            if (success) {
                setUserOrders(orders);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changeOrderStatus = async (id, status) => {
        const token = localStorage.getItem('token');
        if (!token) {
            handleFailure("please login to perform this action")
            return;
        }
        try {
            const response = await axios.patch(`http://localhost:5555/orders/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { orders, success } = response.data;
            if (success) {
                setAllOrders(orders);
                handleSuccess('order status updated');
            } else {
                handleFailure('failed to update status');
            }
        } catch (error) {
            console.log(error);
            handleFailure('failed to update status');
        }
    }

    const handleAddReview = async (prodId, comment) => {
        const token = localStorage.getItem('token');
        if (!token) {
            handleFailure("please login to perform this action")
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:5555/review/${prodId}`,
                { comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            const { success, product } = response.data;
            if (success) {
                handleSuccess("review added");
                setProduct(product);
            }
        } catch (error) {
            handleFailure("failed to add review");
        }
    }

    const contextValue = {
        totalPages,
        allProducts,
        counts,
        featured,
        totalPrice,
        cart,
        wishlist,
        loading,
        product,
        profile,
        adminProducts,
        allOrders,
        userOrders,
        currentPage,
        setCurrentPage,
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
        changeUserDetails,
        editProduct,
        deleteProduct,
        addProduct,
        getAdminProducts,
        checkOutHandler,
        setAllOrders,
        fetchAllOrders,
        changeOrderStatus,
        fetchUserOrders,
        handleFilter,
        handleAddReview
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;