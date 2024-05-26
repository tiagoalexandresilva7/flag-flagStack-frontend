import { useEffect, useState } from 'react';

import hotelService from '../../services/hotelService';
import reviewService from '../../services/reviewService';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import ReviewsGrid from '../components/pages/Reviews/ReviewsGrid';
import ReviewsHeading from '../components/pages/Reviews/ReviewsHeading';

function ReviewsView() {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState();
    const [hotelsWithReviews, setHotelsWithReviews] = useState();

    // todo button to load more?

    useEffect(() => {
        (async () => {
            const response = await reviewService.getRandomReviews();
            setReviews(response);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!reviews) {
                return;
            }

            const hotels = reviews.map(async (review) => {
                const hotel = await hotelService.getHotelById(review.onHotel);
                return hotel;
            });

            const fetchedHotels = await Promise.all(hotels);

            const hotelsWithReviews = fetchedHotels.map((hotel, index) => ({
                hotelId: hotel?._id,
                name: hotel?.name,
                address: hotel?.address,
                city: hotel?.city,
                photos: hotel?.photos,
                pricePerNight: hotel?.pricePerNight,
                reviewId: reviews[index]._id,
                ratings: reviews[index].ratings,
                textReview: reviews[index].textReview,
                author: reviews[index].byUser,
            }));

            setHotelsWithReviews(hotelsWithReviews);
            setIsLoading(false);
        })();
    }, [reviews]);

    if (isLoading) {
        return <LoadingSpinner />;
    } else {
        return (
            <section className="container mx-auto">
                <ReviewsHeading />
                <ReviewsGrid hotelsWithReviews={hotelsWithReviews} />
            </section>
        );
    }
}

export default ReviewsView;
