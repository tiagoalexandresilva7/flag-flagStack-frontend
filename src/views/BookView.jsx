import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import authService from '../../services/authService';
import hotelService from '../../services/hotelService';
import bookingService from '../../services/bookingService';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import BookForm from '../components/pages/Book/BookForm';
import BookHeading from '../components/pages/Book/BookHeading';

function BookView({ hotelId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useLocation();

    const [user, setUser] = useState();
    const [hotel, setHotel] = useState();

    const dayInMilliseconds = 24 * 60 * 60 * 1000;

    const [bookFormData, setBookFormData] = useState({
        checkIn: new Date(),
        checkOut: new Date(new Date().getTime() + dayInMilliseconds),
        numberOfGuests: 1,
        numberOfNights: 1,
        pricePaid: 0,
    });

    useEffect(() => {
        const user = authService.getUserToken();

        if (!user) {
            setLocation('/login');
            return;
        }

        setUser(user);
    }, []);

    useEffect(() => {
        (async () => {
            const hotel = await hotelService.getHotelById(hotelId);
            setHotel(hotel);

            setIsLoading(false);
        })();
    }, [hotelId]);

    function inputHandler(event) {
        if (event.target.name === 'checkIn') {
            if (new Date(event.target.value) < new Date()) {
                return;
            }

            setBookFormData({
                ...bookFormData,
                [event.target.name]: new Date(event.target.value),
            });
        }

        if (event.target.name === 'checkOut') {
            if (new Date(event.target.value) < bookFormData.checkIn) {
                return;
            }

            setBookFormData({
                ...bookFormData,
                [event.target.name]: new Date(event.target.value),
            });
        }

        if (event.target.name === 'numberOfGuests') {
            if (event.target.value < 1) {
                return;
            }

            setBookFormData({
                ...bookFormData,
                [event.target.name]: event.target.value,
            });
        }
    }

    useEffect(() => {
        const checkInDate = new Date(bookFormData.checkIn);
        const checkOutDate = new Date(bookFormData.checkOut);

        const difference = checkOutDate.getTime() - checkInDate.getTime();

        const numberOfNights = Math.ceil(difference / dayInMilliseconds);

        setBookFormData({
            ...bookFormData,
            numberOfNights: numberOfNights,
        });
    }, [bookFormData.checkIn, bookFormData.checkOut]);

    useEffect(() => {
        if (!hotel) {
            return;
        }

        const { pricePerNight, pricePerGuest } = hotel;
        const { checkIn, checkOut, numberOfGuests } = bookFormData;

        const total = bookingService.getTotalPrice(
            pricePerNight,
            pricePerGuest,
            checkIn,
            checkOut,
            numberOfGuests
        );

        setBookFormData({
            ...bookFormData,
            pricePaid: total,
        });
    }, [hotel, bookFormData.numberOfGuests, bookFormData.numberOfNights]);

    async function submitHandler(event) {
        event.preventDefault();

        const bookingData = {
            ...bookFormData,
            checkIn: bookFormData.checkIn.toISOString().slice(0, 10),
            checkOut: bookFormData.checkOut.toISOString().slice(0, 10),
            status: 'Pending',
            byUser: user.id,
            onHotel: hotelId,
        };

        const result = await bookingService.postBooking(user, bookingData);

        if (result) {
            setLocation(`/book/success/${result._id}`);
        }
    }

    if (isLoading) {
        return <LoadingSpinner />;
    } else {
        return (
            <main className="container min-h-screen">
                <BookHeading hotelName={hotel.name} />

                <BookForm
                    submitHandler={submitHandler}
                    inputHandler={inputHandler}
                    bookFormData={bookFormData}
                />
            </main>
        );
    }
}

export default BookView;
