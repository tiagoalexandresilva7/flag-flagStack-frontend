function BookForm({submitHandler, inputHandler, bookFormData}) {
    return (
        <section className="flex justify-center">
            <form onSubmit={submitHandler} className="w-96">
                <label>
                    Check-in
                    <input
                        type="date"
                        onKeyDown={(event) => {
                            event.preventDefault();
                        }}
                        onChange={(event) => inputHandler(event)}
                        value={bookFormData.checkIn.toISOString().slice(0, 10)}
                        name="checkIn"
                        aria-label="Date"
                    />
                </label>
                <label>
                    Check-out
                    <input
                        type="date"
                        onKeyDown={(event) => {
                            event.preventDefault();
                        }}
                        onChange={(event) => inputHandler(event)}
                        value={bookFormData.checkOut.toISOString().slice(0, 10)}
                        name="checkOut"
                        aria-label="Date"
                        required
                    />
                    <small className="text-center font-bold">
                        Nights: {bookFormData.numberOfNights}
                    </small>
                </label>
                <label>
                    Guests
                    <input
                        type="number"
                        onChange={(event) => inputHandler(event)}
                        value={bookFormData.numberOfGuests}
                        name="numberOfGuests"
                        aria-label="Guests"
                        required
                    />
                </label>
                <section className="flex place-content-center mt-4 text-4xl">
                    <p>Total: {bookFormData.pricePaid}€</p>
                </section>
                <label>
                    <input
                        name="terms"
                        type="checkbox"
                        role="switch"
                        required
                    />
                    I agree to the Terms and Conditions
                </label>
                <button type="submit" className="mt-8">
                    Book
                </button>
            </form>
        </section>
    );
}

export default BookForm;
