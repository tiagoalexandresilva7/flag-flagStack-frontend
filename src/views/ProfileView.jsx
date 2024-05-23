import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';

import authService from '../../services/authService';
import userService from '../../services/userService';
import bookingService from '../../services/bookingService';
import hotelService from '../../services/hotelService';
import LoadingSpinner from '../components/LoadingSpinner';
import InfoModal from '../components/profile/InfoModal';

import AccountSettings from '../components/profile/AccountSettings';
import Bookings from '../components/profile/bookings/Bookings';

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
        })();

        setIsLoading(false);
    }, []);

    // const [formUserAccData, setFormUserAccData] = useState({
    //     email: '',
    //     currentPassword: '',
    //     newPassword: '',
    //     confirmNewPassword: '',
    // });

    // const accModal = useRef(null);
    // const [modalTitle, setModalTitle] = useState(
    //     'Your account has been updated!'
    // );
    // const [modalMessage, setModalMessage] = useState(
    //     "The settings you've changed have been saved!"
    // );

    // const putBookingModal = useRef(null);
    // const putBookingConfirmationModal = useRef(null);
    // const [
    //     putBookingConfirmationModalTitle,
    //     setPutBookingConfirmationModalTitle,
    // ] = useState('Your booking has been updated!');
    // const [
    //     putBookingConfirmationModalMessage,
    //     setPutBookingConfirmationModalMessage,
    // ] = useState("The new information you've provided has been saved!");

    // const [booking, setBooking] = useState();
    // const [bookingOldTotal, setBookingOldTotal] = useState();
    // const [hotel, setHotel] = useState();

    async function updateUserSubmitHandler(event) {
        setIsLoading(true);
        event.preventDefault();

        const response = await userService.putUser(user, formUserAccData);

        if (response.message) {
            setModalTitle('Something went wrong!');
            setModalMessage(response.message);
        }

        accModalHandler();

        setIsLoading(false);
    }

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
                    <hgroup className="text-center">
                        <h1>My profile</h1>
                        <p>You can manage your account here!</p>
                    </hgroup>
                    {userData && (
                        <AccountSettings user={user} userData={userData} />
                    )}
                    {bookings && <Bookings user={user} bookings={bookings} />}
                </section>
            </>
        );
    }
}

export default ProfileView;
