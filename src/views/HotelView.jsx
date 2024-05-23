import { useEffect, useState } from 'react';
import { Link } from 'wouter';

function HotelView({ hotelId }) {
    const [hotel, setHotel] = useState([]);
    const [hotelReviews, setHotelReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const url = `http://localhost:3000/hotels/${hotelId}`;
            const response = await fetch(url);
            const result = await response.json();
            setHotel(result);
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            const url = `http://localhost:3000/reviews?onHotel=${hotelId}`;
            const response = await fetch(url);
            const result = await response.json();
            setHotelReviews(result.reviews);
            setIsLoading(false);
        })();
    }, [hotel]);

    if (isLoading) {
        return (
            <section className="pt-8 container">
                <div aria-busy="true"></div>
                <h2 className="text-center mt-8">Loading...</h2>
            </section>
        );
    } else {
        return (
            <section className="container">
                <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-center">
                    {hotel.photos.map((photo) => (
                        <img
                            className="w-full h-full"
                            src={photo}
                            alt={hotel.name}
                        />
                    ))}
                </section>
                <section className="grid grid-cols-2 text-center">
                    <hgroup>
                        <h1>{hotel.name}</h1>
                        <h4 className="mt-4">{hotel.city}</h4>
                        <h3>{hotel.address}</h3>
                    </hgroup>
                    <section>
                        <hgroup>
                            <h1>{hotel.pricePerNight}€ / night</h1>
                            <h4 className="mt-4">
                                + {hotel.pricePerGuest}€ / guest
                            </h4>
                        </hgroup>
                    </section>
                </section>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Laudantium veritatis facilis reiciendis, minus voluptate
                    labore molestias amet, dolorem unde doloribus perferendis
                    maxime, consectetur ut rem. Fugiat itaque rem consequatur.
                    Dolor. Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Nihil quis quidem perspiciatis laboriosam expedita aut
                    rem! Reiciendis fuga quo possimus tempore quod nesciunt qui
                    animi aperiam, asperiores vitae culpa ipsum? Lorem ipsum,
                    dolor sit amet consectetur adipisicing elit. Laudantium
                    veritatis facilis reiciendis, minus voluptate labore
                    molestias amet, dolorem unde doloribus perferendis maxime,
                    consectetur ut rem. Fugiat itaque rem consequatur. Dolor.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil quis quidem perspiciatis laboriosam expedita aut rem!
                    Reiciendis fuga quo possimus tempore quod nesciunt qui animi
                    aperiam, asperiores vitae culpa ipsum?
                </p>
                <section className="text-center mt-8">
                    <Link className="text-white" to={`/book/${hotelId}`}>
                        <button>Book now!</button>
                    </Link>
                </section>
                <section className="text-center mt-8">
                    <h1>Reviews</h1>
                </section>
                {hotelReviews.length > 0 ? (
                    <section className="grid md:grid-cols-2 2xl:grid-cols-3">
                        {hotelReviews.map((review) => (
                            <article key={review._id}>
                                <section>
                                    <p className="mb-0">
                                        Food:{' '}
                                        {Array.from(
                                            { length: review.ratings.food },
                                            (_, index) => (
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
                                            { length: review.ratings.location },
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
                                                length: review.ratings
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
                                                length: review.ratings
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
                                <p>{review.textReview}</p>
                            </article>
                        ))}
                    </section>
                ) : (
                    <section className="text-center mt-8">
                        <hgroup>
                            <h3>No review is available.</h3>
                            <p>Want to be the first to write one?</p>
                        </hgroup>
                    </section>
                )}
            </section>
        );
    }
}

export default HotelView;
