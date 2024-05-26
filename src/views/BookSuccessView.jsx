import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import authService from '../../services/authService';
import bookingService from '../../services/bookingService';
import hotelService from '../../services/hotelService';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import HotelGallery from '../components/pages/Hotel/HotelGallery';
import BookMap from '../components/pages/BookSuccess/BookMap';
import BookHomepageButton from '../components/pages/BookSuccess/BookHomepageButton';
import BookSuccessHeading from '../components/pages/BookSuccess/BookSuccessHeading';
import BookSuccessInfo from '../components/pages/BookSuccess/BookSuccessInfo';

function BookSuccessView({ bookingId }) {
    const [location, setLocation] = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState();
    const [booking, setBooking] = useState();
    const [hotel, setHotel] = useState();

    useEffect(() => {
        (async () => {
            const user = await authService.getUserToken();

            if (!user) {
                setLocation('/login');
                return;
            }

            setUser(user);

            const booking = await bookingService.getBookingById(
                user,
                bookingId
            );
            setBooking(booking);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!booking) {
                return;
            }

            const hotel = await hotelService.getHotelById(booking.onHotel);
            setHotel(hotel);

            setIsLoading(false);
        })();
    }, [booking]);

    if (isLoading) {
        return <LoadingSpinner />
    } else {
        return (
            <main className="container min-h-screen mx-auto">
                <BookSuccessHeading />
                <BookSuccessInfo hotelName={hotel.name} booking={booking} />
                <HotelGallery hotelName={hotel.name} photos={hotel.photos} />
                {/* <BookMap /> */}
                <BookHomepageButton />
            </main>
        );
    }
}

export default BookSuccessView;
