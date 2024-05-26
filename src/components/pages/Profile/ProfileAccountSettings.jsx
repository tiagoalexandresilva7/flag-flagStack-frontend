import { useState } from 'react';
import InfoModal from '../../ui/InfoModal';

import userService from '../../../../services/userService';
import ProfileAccountSettingsUpdateForm from './ProfileAccountSettingsUpdateForm';

function ProfileAccountSettings({ user, userData }) {
    const [isLoading, setIsLoading] = useState(true);

    const [formUserAccData, setFormUserAccData] = useState({
        email: userData.email,
        role: userData.role
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [infoModalText, setInfoModalText] = useState({
        title: 'Your account has been updated!',
        message: "The settings you've changed have been saved!",
    });

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
        
        setIsFormSubmitted(true);
        setIsLoading(false);
    }

    return (
        <>
            <details>
                {isFormSubmitted && <InfoModal infoModalText={infoModalText} />}
                <summary role="button">Account settings</summary>
                <ProfileAccountSettingsUpdateForm
                    formUserAccData={formUserAccData}
                    setFormUserAccData={setFormUserAccData}
                    formSubmitHandler={formSubmitHandler}
                />
            </details>
        </>
    );
}

export default ProfileAccountSettings;
