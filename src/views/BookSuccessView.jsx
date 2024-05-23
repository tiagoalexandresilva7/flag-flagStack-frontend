import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';

function BookSuccessView({ bookingId }) {
    const [location, setLocation] = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [booking, setBooking] = useState();
    const [hotel, setHotel] = useState();

    useEffect(() => {
        (async () => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (!user) {
                setLocation('/login');
                return;
            }

            setUser(user);

            const options = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const url = `http://localhost:3000/bookings/${bookingId}`;
            const response = await fetch(url, options);
            const result = await response.json();

            setBooking(result);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!booking) {
                return;
            }

            const url = `http://localhost:3000/hotels/${booking.onHotel}`;
            const response = await fetch(url);
            const result = await response.json();

            setHotel(result);
            setIsLoading(false);
        })();
    }, [booking]);

    if (isLoading) {
        return (
            <section className="container min-h-screen flex flex-col place-content-center mx-auto">
                <section aria-busy="true"></section>
                <h2 className="text-center mt-8">Loading...</h2>
            </section>
        );
    } else {
        return (
            <main className="container min-h-screen mx-auto">
                <h1 className="text-center">Booking successful!</h1>
                <section className="text-center mt-8">
                    <h3>{hotel.name}</h3>
                    <section className="mt-8 xl:flex gap-12 place-content-center">
                        <section className="mb-0 flex gap-12 place-content-center">
                            <section>
                                <p className="text-xl mb-1">Check-in:</p>
                                <p>
                                    {new Date(booking.checkIn)
                                        .toISOString()
                                        .slice(0, 10)}
                                </p>
                            </section>
                            <section>
                                <p className="text-xl mb-1">Check-out:</p>
                                <p>
                                    {new Date(booking.checkOut)
                                        .toISOString()
                                        .slice(0, 10)}
                                </p>
                            </section>
                        </section>
                        <section className="mb-0 flex gap-12 place-content-center">
                            <section>
                                <p className="mb-1">Guests:</p>
                                <p>{booking.numberOfGuests}</p>
                            </section>
                            <section>
                                <p className="mb-1">Total:</p>
                                <p>
                                    <span className="font-bold">
                                        {booking.pricePaid}€
                                    </span>
                                </p>
                            </section>
                        </section>
                        <section>
                            <p className="mb-1">Status:</p>
                            <p className="font-bold">{booking.status}</p>
                        </section>
                        <section className="pb-0 mb-0">
                            <p className="mb-1">
                                Please wait for confirmation on your email.
                            </p>
                            <p className="pt-0 mt-0">
                                It can take up to 24 hours.
                            </p>
                        </section>
                    </section>
                </section>
                <section className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-center">
                    {hotel.photos.map((photo) => (
                        <img
                            className="w-full h-full"
                            src={photo}
                            alt={hotel.name}
                        />
                    ))}
                </section>
                <section className="mt-8 text-center">
                    <h3>How to get there</h3>
                    <div>MAP</div>
                </section>
                <section className="text-center mt-8">
                    <Link to="/">
                        <button>Go to homepage</button>
                    </Link>
                </section>
            </main>
        );
    }
}

export default BookSuccessView;
