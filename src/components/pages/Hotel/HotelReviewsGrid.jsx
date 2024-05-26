import HotelReviewCard from './HotelReviewCard';

function HotelReviewsGrid({ reviews }) {
    return (
        <section className="grid md:grid-cols-2 2xl:grid-cols-3">
            {reviews.map((review) => (
                <HotelReviewCard review={review} />
            ))}
        </section>
    );
}

export default HotelReviewsGrid;
