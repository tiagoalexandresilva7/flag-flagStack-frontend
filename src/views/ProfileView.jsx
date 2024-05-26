import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import authService from '../../services/authService';
import userService from '../../services/userService';
import bookingService from '../../services/bookingService';
import hotelService from '../../services/hotelService';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProfileAccountSettings from '../components/pages/Profile/ProfileAccountSettings';
import ProfileBookingsTable from '../components/pages/Profile/ProfileBookingsTable';
import ProfileHeading from '../components/pages/Profile/ProfileHeading';

function ProfileView() {
    const [location, setLocation] = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState();
    const [userData, setUserData] = useState();
    const [bookings, setBookings] = useState();

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
        })();

        (async () => {
            const userBookings = await bookingService.getBookingsByUserId(user);
            setBookings(userBookings.bookings);
            // todo pagination?

            setIsLoading(false);
        })();
    }, []);

    async function getBookingInfo(id) {
        const booking = await bookingService.getBookingById(user, id);

        setBooking({
            ...booking,
            checkIn: new Date(booking.checkIn).toISOString().slice(0, 10),
            checkOut: new Date(booking.checkIn).toISOString().slice(0, 10),
        });

        setBookingOldTotal(booking.pricePaid);

        const hotel = await hotelService.getHotelById(booking.onHotel);

        setHotel(hotel);

        putBookingModalHandler();
    }

    function bookingInputHandler(event) {
        setBooking({
            ...booking,
            [event.target.name]: event.target.value,
        });
    }

    // useEffect(() => {
    //     if (!booking || !hotel) {
    //         return;
    //     }

    //     const { pricePerNight, pricePerGuest } = hotel;
    //     const { checkIn, checkOut, numberOfGuests } = booking;

    //     const newTotal = bookingService.getTotalPrice(
    //         pricePerNight,
    //         pricePerGuest,
    //         new Date(checkIn),
    //         new Date(checkOut),
    //         numberOfGuests
    //     );

    //     setBooking({
    //         ...booking,
    //         pricePaid: newTotal,
    //     });
    // }, [booking?.checkIn, booking?.checkOut, booking?.numberOfGuests]);

    async function updateBookingSubmitHandler(event) {
        event.preventDefault();

        const response = await bookingService.putBooking(user, booking);

        if (response.message) {
            setPutBookingConfirmationModalTitle('Something went wrong!');
            setPutBookingConfirmationModalMessage(response.message);
        }

        const updatedBookings = await bookingService.getBookingsByUserId(user);
        setBookings(updatedBookings.bookings);

        putBookingModalHandler();
        putBookingConfirmationModalHandler();
    }

    if (isLoading) {
        return <LoadingSpinner />;
    } else {
        return (
            <>
                <section className="container mx-auto">
                    <ProfileHeading />
                    <ProfileAccountSettings user={user} userData={userData} />
                    <ProfileBookingsTable user={user} bookings={bookings} />
                </section>
            </>
        );
    }
}

export default ProfileView;
