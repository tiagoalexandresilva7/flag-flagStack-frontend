import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import authService from '../../services/authService';
import userService from '../../services/userService';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import AccountSettings from '../components/pages/Profile/AccountSettings/AccountSettings';
import Heading from '../components/pages/Profile/ProfileHeading';
import Bookings from '../components/pages/Profile/Bookings/Bookings';
import Reviews from '../components/pages/Profile/Reviews/Reviews';
import Logout from '../components/pages/Profile/Logout/Logout';

function ProfileView() {
    const [location, setLocation] = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState();
    const [userData, setUserData] = useState();

    useEffect(() => {
        const user = authService.getUserToken();

        if (!user) {
            setLocation('/login');
            return;
        }

        setUser(user);

        (async () => {
            const userData = await userService.getUserById(user);
            setUserData(userData);

            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    } else {
        return (
            <>
                <section className="container mx-auto min-h-screen text-center">
                    <Heading />
                    <AccountSettings user={user} userData={userData} />
                    <Bookings user={user} />
                    <Reviews user={user} />
                    <Logout />
                </section>
            </>
        );
    }
}

export default ProfileView;
