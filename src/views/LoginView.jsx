import { useState } from 'react';
import { useLocation } from 'wouter';

import authService from '../../services/authService';

import InfoModal from '../components/ui/InfoModal';
import LoginForm from '../components/pages/Login/LoginForm';
import LoginHeading from '../components/pages/Login/LoginHeading';
import LoginSignUpButton from '../components/pages/Login/LoginSignUpButton';

function LoginView() {
    const [loginFormData, setLoginFormData] = useState();

    const [infoModalText, setInfoModalText] = useState();

    const [location, setLocation] = useLocation();

    async function loginHandler(event) {
        event.preventDefault();

        const result = await authService.loginUser(loginFormData);

        if (result.message) {
            setInfoModalText({
                title: 'Something went wrong!',
                message: result.message,
            });

            return;
        }

        authService.setUserToken(result);

        setInfoModalText({
            title: 'Logged in successfully!',
            message: 'Redirecting to the homepage shortly...',
        });

        setTimeout(() => {
            setLocation('/');
        }, 3000);
    }

    return (
        <main className="container min-h-screen w-96">
            {infoModalText && <InfoModal infoModalText={infoModalText} />}

            <LoginHeading />

            <LoginForm
                loginHandler={loginHandler}
                loginFormData={loginFormData}
                setLoginFormData={setLoginFormData}
            />

            <LoginSignUpButton />
        </main>
    );
}

export default LoginView;
