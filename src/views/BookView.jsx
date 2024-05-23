import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

function BookView({ hotelId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [hotel, setHotel] = useState();
    
    const dayInMiliseconds = 24 * 60 * 60 * 1000;
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(
        new Date(checkIn.getTime() + dayInMiliseconds)
    );

    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [numberOfNights, setNumberOfNights] = useState();
    const [totalPrice, setTotalPrice] = useState();

    const [location, setLocation] = useLocation();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            setLocation('/login');
            return;
        }

        setUser(user);
    }, []);

    useEffect(() => {
        (async () => {
            const url = `http://localhost:3000/hotels/${hotelId}`;
            const response = await fetch(url);
            const result = await response.json();
            setHotel(result);
            setIsLoading(false);
        })();
    }, []);

    function inputHandler(event) {
        if (event.target.name === 'checkIn') {
            if (new Date(event.target.value) < new Date()) {
                return;
            }

            setCheckIn(new Date(event.target.value));
        }

        if (event.target.name === 'checkOut') {
            if (new Date(event.target.value) < checkIn) {
                return;
            }

            setCheckOut(new Date(event.target.value));
        }

        if (event.target.name === 'numberOfGuests') {
            if (event.target.value < 1) {
                return;
            }

            setNumberOfGuests(event.target.value);
        }
    }

    useEffect(() => {
        const totalNights = Math.ceil((checkOut - checkIn) / dayInMiliseconds);

        setNumberOfNights(totalNights > 1 ? totalNights : 1);
    }, [checkIn, checkOut]);

    useEffect(() => {
        const totalGuestsPrice = hotel?.pricePerGuest * numberOfGuests;
        const totalNightsPrice = hotel?.pricePerNight * numberOfNights;

        const total = totalGuestsPrice + totalNightsPrice;

        setTotalPrice(total);
    }, [hotel, numberOfGuests, numberOfNights]);

    async function submitHandler(event) {
        event.preventDefault();

        const body = {
            pricePaid: totalPrice,
            numberOfGuests: numberOfGuests,
            checkIn: checkIn.toISOString().slice(0, 10),
            checkOut: checkOut.toISOString().slice(0, 10),
            status: 'Pending',
            byUser: user.id,
            onHotel: hotelId,
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${user.token}`,
            },
        };

        const url = 'http://localhost:3000/bookings';
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);

        if (result) {
            setLocation(`/book/success/${result._id}`);
        }
    }

    if (isLoading) {
        return (
            <section className="container min-h-screen flex flex-col place-content-center">
                <section aria-busy="true"></section>
                <h2 className="text-center mt-8">Loading...</h2>
            </section>
        );
    } else {
        return (
            <main className="container min-h-screen">
                <hgroup className="text-center">
                    <h1>Booking on {hotel?.name}</h1>
                    <p>Please fill in the form</p>
                </hgroup>
                <section className="flex justify-center">
                    <form onSubmit={submitHandler} className="w-96">
                        <label>
                            Check-in
                            <input
                                type="date"
                                onChange={(event) => inputHandler(event)}
                                value={checkIn.toISOString().slice(0, 10)}
                                name="checkIn"
                                aria-label="Date"
                            />
                        </label>
                        <label>
                            Check-out
                            <input
                                type="date"
                                onChange={(event) => inputHandler(event)}
                                value={checkOut.toISOString().slice(0, 10)}
                                name="checkOut"
                                aria-label="Date"
                                required
                            />
                            <small className="text-center font-bold">
                                Nights: {numberOfNights}
                            </small>
                        </label>
                        <label>
                            Guests
                            <input
                                type="number"
                                onChange={(event) => inputHandler(event)}
                                value={numberOfGuests}
                                name="numberOfGuests"
                                aria-label="Guests"
                                required
                            />
                        </label>
                        <section className="flex place-content-center mt-4 text-4xl">
                            <p>Total: {totalPrice}€</p>
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
            </main>
        );
    }
}

export default BookView;
