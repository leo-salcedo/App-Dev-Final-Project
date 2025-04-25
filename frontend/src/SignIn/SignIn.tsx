import { useState } from 'react';
import "./SignIn.css"

const backendUrl = process.env.REACT_APP_BACKEND;

const handleLogin = () => {
    window.location.href = `${backendUrl}/login`;
};

const SignIn = ()=> {
    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
}

export default SignIn;