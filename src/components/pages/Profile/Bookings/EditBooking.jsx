import { useEffect, useState } from 'react';

import bookingService from '../../../../../services/bookingService';
import hotelService from '../../../../../services/hotelService';

import EditBookingForm from './EditBookingForm';

function EditBooking({
    user,
    editingBooking,
    setShowEditBookingForm,
    setIsBookingUpdated,
}) {
    const { checkIn, checkOut, createdAt } = editingBooking;

    const [bookingFormData, setBookingFormData] = useState({
        ...editingBooking,
        checkIn: new Date(checkIn).toISOString().slice(0, 10),
        checkOut: new Date(checkOut).toISOString().slice(0, 10),
        createdAt: new Date(createdAt).toISOString().slice(0, 10),
    });

    const [hotel, setHotel] = useState();

    useEffect(() => {
        (async () => {
            const response = await hotelService.getHotelById(
                editingBooking.onHotel
            );

            setHotel(response);
        })();
    }, []);

    useEffect(() => {
        if (!bookingFormData || !hotel) {
            return;
        }

        const { pricePerNight, pricePerGuest } = hotel;
        const { checkIn, checkOut, numberOfGuests } = bookingFormData;

        const newTotal = bookingService.getTotalPrice(
            pricePerNight,
            pricePerGuest,
            new Date(checkIn),
            new Date(checkOut),
            numberOfGuests
        );

        setBookingFormData({
            ...bookingFormData,
            pricePaid: newTotal,
        });
    }, [
        bookingFormData?.checkIn,
        bookingFormData?.checkOut,
        bookingFormData?.numberOfGuests,
    ]);

    async function formSubmitHandler(event) {
        setIsBookingUpdated(false);

        event.preventDefault();

        const response = await bookingService.putBooking(user, bookingFormData);
    }

    return (
        <>
            {bookingFormData && (
                <EditBookingForm
                    bookingFormData={bookingFormData}
                    setBookingFormData={setBookingFormData}
                    formSubmitHandler={formSubmitHandler}
                    setShowEditBookingForm={setShowEditBookingForm}
                />
            )}
        </>
    );
}

export default EditBooking;
