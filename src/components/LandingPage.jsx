import { useEffect, useState } from 'react';
import Card from './Card';

function LandingPage() {
    const [randomHotels, setRandomHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const url = 'http://localhost:3000/hotels?byRandom=true';
            const response = await fetch(url);
            const result = await response.json();
            setRandomHotels(result.hotels);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <main className="pt-8 container">
                <section aria-busy="true"></section>
                <h2 className='text-center mt-8'>Loading...</h2>
            </main>
        );
    } else {
        return (
            <main className="mt-4 container">
                <hgroup className='text-center'>
                    <h2>Check out some of our hotels</h2>
                    <p>Your next destination might be here!</p>
                </hgroup>
                <section className="mt-4 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 text-center">
                    {randomHotels.map((hotel) => (
                        <Card
                            key={hotel._id}
                            id={hotel._id}
                            name={hotel.name}
                            poster={hotel.photos[0]}
                            city={hotel.city}
                            price={hotel.pricePerNight}
                        />
                    ))}
                </section>
            </main>
        );
    }
}
export default LandingPage;
