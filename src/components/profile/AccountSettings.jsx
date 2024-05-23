import { useState } from 'react';
import InfoModal from './InfoModal';

import userService from '../../../services/userService';

function AccountSettings({user, userData}) {
    const [isLoading, setIsLoading] = useState(true);

    const [formUserAccData, setFormUserAccData] = useState({email: userData.email});

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [infoModalText, setInfoModalText] = useState({
        title: 'Your account has been updated!',
        message: "The settings you've changed have been saved!",
    });

    function formInputHandler(event) {
        setFormUserAccData({
            ...formUserAccData,
            [event.target.name]: event.target.value,
        });
    }

    async function formSubmitHandler(event) {
        setIsLoading(true);
        event.preventDefault();

        const response = await userService.putUser(user, formUserAccData);

        if (response.message) {
            setInfoModalText({
                title: 'Something went wrong!',
                message: response.message,
            });
        }

        setIsLoading(false);
        setIsFormSubmitted(true);
    }

    return (
        <>
            <details>
                {isFormSubmitted && <InfoModal infoModalText={infoModalText} />}
                <summary role="button">Account settings</summary>
                <section className="flex justify-center">
                    <form onSubmit={formSubmitHandler}>
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                aria-label="Login"
                                autoComplete="email"
                                value={formUserAccData?.email}
                                required
                                onChange={(event) => formInputHandler(event)}
                            />
                        </label>
                        <label>
                            Current password
                            <input
                                type="password"
                                name="currentPassword"
                                aria-label="currentPassword"
                                required
                                onChange={(event) => formInputHandler(event)}
                            />
                        </label>
                        <label>
                            New password
                            <input
                                type="password"
                                name="newPassword"
                                aria-label="newPassword"
                                onChange={(event) => formInputHandler(event)}
                            />
                        </label>
                        <label>
                            Confirm new password
                            <input
                                type="password"
                                name="confirmNewPassword"
                                aria-label="confirmNewPassword"
                                required
                                onChange={(event) => formInputHandler(event)}
                            />
                        </label>
                        <button type="submit">Update</button>
                    </form>
                </section>
            </details>
        </>
    );
}

export default AccountSettings;
