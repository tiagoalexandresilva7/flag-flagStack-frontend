function EditBookingForm({
    bookingFormData,
    setBookingFormData,
    formSubmitHandler,
    setShowEditBookingForm,
}) {
    function inputHandler(event) {
        if (event.target.name === 'checkIn') {
            if (new Date(event.target.value) < new Date()) {
                return;
            }

            setBookingFormData({
                ...bookingFormData,
                [event.target.name]: new Date(event.target.value)
                    .toISOString()
                    .slice(0, 10),
            });
        }

        if (event.target.name === 'checkOut') {
            if (
                new Date(event.target.value) < new Date(bookingFormData.checkIn)
            ) {
                return;
            }

            setBookingFormData({
                ...bookingFormData,
                [event.target.name]: new Date(event.target.value)
                    .toISOString()
                    .slice(0, 10),
            });
        }

        if (event.target.name === 'numberOfGuests') {
            if (event.target.value < 1) {
                return;
            }

            setBookingFormData({
                ...bookingFormData,
                [event.target.name]: event.target.value,
            });
        }
    }

    return (
        <dialog open>
            <article>
                <hgroup>
                    <h2>Edit booking</h2>
                    <p>You can make changes to your booking here!</p>
                </hgroup>
                <section className="flex justify-center">
                    <form onSubmit={formSubmitHandler}>
                        <label>
                            Booked at
                            <input
                                type="date"
                                name="createdAt"
                                aria-label="Booked At"
                                value={bookingFormData.createdAt}
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
                                value={bookingFormData.checkIn}
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
                                value={bookingFormData.checkOut}
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
                    <button onClick={() => setShowEditBookingForm(false)}>
                        Close
                    </button>
                </footer>
            </article>
        </dialog>
    );
}

export default EditBookingForm;
