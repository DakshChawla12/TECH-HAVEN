import React from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import { useLocation } from "react-router-dom";

const Signup_page = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname === "/signup" && <SignUp />}
            {location.pathname === "/login" && <Login />}
        </>
    );
};

export default Signup_page;
