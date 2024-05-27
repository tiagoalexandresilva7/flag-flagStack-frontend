import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import authService from '../../services/authService';
import userService from '../../services/userService';
import bookingService from '../../services/bookingService';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProfileAccountSettings from '../components/pages/Profile/ProfileAccountSettings';
import ProfileBookingsTable from '../components/pages/Profile/ProfileBookingsTable';
import ProfileHeading from '../components/pages/Profile/ProfileHeading';
import ProfileBookings from '../components/pages/Profile/ProfileBookings';

function ProfileView() {
    const [location, setLocation] = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState();
    const [userData, setUserData] = useState();
    // const [bookings, setBookings] = useState();

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

        // (async () => {
        //     const userBookings = await bookingService.getBookingsByUserId(user);
        //     setBookings(userBookings.bookings);
        //     // todo pagination?

        // })();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    } else {
        return (
            <>
                <section className="container mx-auto">
                    <ProfileHeading />
                    <ProfileAccountSettings user={user} userData={userData} />
                    {/* <ProfileBookingsTable user={user} bookings={bookings} /> */}
                    <ProfileBookings user={user} /* bookings={bookings} */ />
                </section>
            </>
        );
    }
}

export default ProfileView;
