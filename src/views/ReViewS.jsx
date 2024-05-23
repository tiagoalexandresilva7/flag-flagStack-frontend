import { useEffect, useState } from 'react';
import { Link } from 'wouter';

function ReViewS() {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState();
    const [hotelsWithReviews, setHotelsWithReviews] = useState();

    useEffect(() => {
        (async () => {
            const url = `http://localhost:3000/reviews?byRandom=true`;
            const response = await fetch(url);
            const result = await response.json();

            setReviews(result.reviews);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!reviews) {
                return;
            }

            const hotels = reviews.map(async (review) => {
                const url = review.onHotel;
                const response = await fetch(url);
                const result = await response.json();
                return result;
            });

            const fetchedHotels = await Promise.all(hotels);

            const mergedData = fetchedHotels.map((hotel, index) => ({
                id: hotel?._id,
                name: hotel?.name,
                address: hotel?.address,
                city: hotel?.city,
                pricePerNight: hotel?.pricePerNight,
                ratings: reviews[index].ratings,
                textReview: reviews[index].textReview,
                author: reviews[index].byUser,
            }));

            setHotelsWithReviews(mergedData);
            setIsLoading(false);
        })();
    }, [reviews]);

    if (isLoading) {
        return (
            <section className="pt-8 container">
                <div aria-busy="true"></div>
                <h2 className="text-center mt-8">Loading...</h2>
            </section>
        );
    } else {
        return (
            <section className="container mx-auto">
                <hgroup className="text-center">
                    <h1>Reviews</h1>
                    <p>See what our guests are saying about their stays!</p>
                </hgroup>
                <section className="grid md:grid-cols-2 2xl:grid-cols-3">
                    {hotelsWithReviews.map((hotel, index) => (
                        <article key={index} className='grid grid-cols-1 place-content-between'>
                            <section>
                                <hgroup>
                                    <h3>{hotel.name}</h3>
                                    <p className="italic">{hotel.city}</p>
                                    <p>
                                        <span className="font-bold">
                                            {hotel.pricePerNight}€
                                        </span>{' '}
                                        / night
                                    </p>
                                </hgroup>
                                <p className="mb-0">
                                    Food:{' '}
                                    {Array.from(
                                        { length: hotel.ratings.food },
                                        (index) => (
                                            <i
                                                key={index}
                                                className="fa-solid fa-star"
                                            ></i>
                                        )
                                    )}
                                </p>
                                <p className="mb-0">
                                    Location:{' '}
                                    {Array.from(
                                        { length: hotel.ratings.location },
                                        (index) => (
                                            <i
                                                key={index}
                                                className="fa-solid fa-star"
                                            ></i>
                                        )
                                    )}
                                </p>
                                <p className="mb-0">
                                    Presentation:{' '}
                                    {Array.from(
                                        {
                                            length: hotel.ratings
                                                .presentationAndCleanliness,
                                        },
                                        (index) => (
                                            <i
                                                key={index}
                                                className="fa-solid fa-star"
                                            ></i>
                                        )
                                    )}
                                </p>
                                <p className="mb-0">
                                    Features:{' '}
                                    {Array.from(
                                        {
                                            length: hotel.ratings
                                                .servicesAndFeatures,
                                        },
                                        (index) => (
                                            <i
                                                key={index}
                                                className="fa-solid fa-star"
                                            ></i>
                                        )
                                    )}
                                </p>
                            </section>
                            <p>{hotel.textReview}</p>
                            <Link className='text-center' to={`/hotel/${hotel.id}`}>
                                <button>Go to Hotel</button>
                            </Link>
                        </article>
                    ))}
                </section>
            </section>
        );
    }
}

export default ReViewS;
