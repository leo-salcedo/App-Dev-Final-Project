import { useState } from 'react';
import "./SignIn.css"

const handleLogin = () => {
    window.location.href = 'https://redesigned-bassoon-j77q7ww9v5j2j76x-8000.app.github.dev/login';
};

const SignIn = ()=> {
    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
}

export default SignIn;