import { useEffect, useState } from 'react';

import bookingService from '../../../../services/bookingService';
import hotelService from '../../../../services/hotelService';

function EditBooking({ user, booking }) {
    const [bookingFormData, setBookingFormData] = useState();
    const [hotel, setHotel] = useState();

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [infoModalText, setInfoModalText] = useState({
        title: 'Your booking has been updated!',
        message: "The new info you've provided has been saved!",
    });

    useEffect(() => {
        (async () => {
            setBookingFormData({
                ...booking,
                checkIn: new Date(booking.checkIn).toISOString().slice(0, 10),
                checkOut: new Date(booking.checkIn).toISOString().slice(0, 10),
            });

            console.log(bookingFormData);

            const hotelInfo = await hotelService.getHotelById(
                booking.onHotel
            );

            setHotel(hotelInfo);
        })();
    }, []);

    function inputHandler(event) {
        setBookingFormData({
            ...booking,
            [event.target.name]: event.target.value,
        });
    }

    async function updateBookingSubmitHandler(event) {
        event.preventDefault();

        const response = await bookingService.putBooking(user, booking);

        if (response.message) {
            setInfoModalText({
                title: 'Something went wrong!',
                message: response.message,
            });
        }

        setIsFormSubmitted(true);
    }

    return (
        <>
            {isFormSubmitted && <InfoModal infoModalText={infoModalText} />}
            {bookingFormData && (
                <dialog open>
                    <article>
                        <hgroup>
                            <h2>Edit booking</h2>
                            <p>You can make changes to your booking here!</p>
                        </hgroup>
                        <section className="flex justify-center">
                            <form onSubmit={updateBookingSubmitHandler}>
                                <label>
                                    Booked at
                                    <input
                                        type="date"
                                        name="bookedAt"
                                        aria-label="Booked At"
                                        value={new Date(
                                            bookingFormData.createdAt
                                        )
                                            .toISOString()
                                            .slice(0, 10)}
                                        disabled
                                    />
                                </label>
                                <label>
                                    Check-In
                                    <input
                                        type="date"
                                        name="checkIn"
                                        aria-label="Check-In"
                                        onKeyDown={() => {
                                            return false;
                                        }}
                                        value={new Date(bookingFormData.checkIn)
                                            .toISOString()
                                            .slice(0, 10)}
                                        onChange={(event) => {
                                            inputHandler(event);
                                        }}
                                    />
                                </label>
                                <label>
                                    Check-Out
                                    <input
                                        type="date"
                                        name="checkOut"
                                        aria-label="Check-Out"
                                        onKeyDown={() => {
                                            return false;
                                        }}
                                        value={new Date(
                                            bookingFormData.checkOut
                                        )
                                            .toISOString()
                                            .slice(0, 10)}
                                        onChange={(event) => {
                                            inputHandler(event);
                                        }}
                                    />
                                </label>
                                <label>
                                    Guests
                                    <input
                                        type="number"
                                        name="numberOfGuests"
                                        aria-label="Number of guests"
                                        value={bookingFormData.numberOfGuests}
                                        onChange={(event) => {
                                            inputHandler(event);
                                        }}
                                    />
                                </label>
                                <p>
                                    New total:{' '}
                                    <span className="font-bold text-xl">
                                        {bookingFormData.pricePaid}€
                                    </span>{' '}
                                </p>
                                <button type="submit">Update</button>
                            </form>
                        </section>
                        <footer>
                            <button>Cancel</button>
                        </footer>
                    </article>
                </dialog>
            )}
        </>
    );
}

export default EditBooking;
