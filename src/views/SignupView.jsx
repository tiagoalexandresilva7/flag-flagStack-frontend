import { useState } from 'react';
import { Link, useLocation } from 'wouter';

import userService from '../../services/userService';
import InfoModal from '../components/ui/InfoModal';
import authService from '../../services/authService';
import SignupForm from '../components/pages/Signup/SignupForm';
import SignupHeading from '../components/pages/Signup/SignupHeading';
import SignupAlreadyHasAccount from '../components/pages/Signup/SignupAlreadyHasAccount';

function SignupView() {
    const [signupFormData, setSignupFormData] = useState({
        role: 'User',
    });

    const [infoModalText, setInfoModalText] = useState();

    const [location, setLocation] = useLocation();

    async function signupHandler(event) {
        event.preventDefault();

        if (signupFormData.password !== signupFormData.confirmPassword) {
            setInfoModalText({
                title: 'Something went wrong!',
                message: 'Both password fields must be the same!',
            });

            return;
        }

        const response = await userService.postUser(signupFormData);

        if (response.message) {
            setInfoModalText({
                title: 'Something went wrong!',
                message: response.message,
            });

            return;
        }

        const login = await authService.loginUser(signupFormData);

        authService.setUserToken(login);

        setInfoModalText({
            title: 'Account created successfully!',
            message: 'Redirecting to the homepage shortly...',
        });

        setTimeout(() => {
            setLocation('/');
        }, 3000);
    }

    return (
        <>
            {infoModalText && (
                <InfoModal
                    infoModalText={infoModalText}
                    setInfoModalText={setInfoModalText}
                />
            )}

            <main className="container min-h-screen">
                <SignupHeading />

                <SignupForm
                    signupFormData={signupFormData}
                    setSignupFormData={setSignupFormData}
                    signupHandler={signupHandler}
                />

                <SignupAlreadyHasAccount />
            </main>
        </>
    );
}

export default SignupView;
