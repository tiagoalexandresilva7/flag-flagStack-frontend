import HotelNoReviews from './HotelNoReviews';
import HotelReviewsGrid from './HotelReviewsGrid';
import HotelReviewsHeading from './HotelReviewsHeading';

function HotelReviews({ reviews }) {
    if (reviews.length > 0) {
        return (
            <section>
                <HotelReviewsHeading />
                <HotelReviewsGrid reviews={reviews} />
            </section>
        );
    } else {
        return <HotelNoReviews />;
    }
}

export default HotelReviews;
