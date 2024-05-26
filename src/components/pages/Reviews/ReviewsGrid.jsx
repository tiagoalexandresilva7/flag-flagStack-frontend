import ReviewCard from './ReviewCard';

function ReviewsGrid({ hotelsWithReviews }) {
    return (
        <section className="grid md:grid-cols-2 2xl:grid-cols-3">
            {hotelsWithReviews.map((hotelWithReview) => (
                <ReviewCard
                    key={hotelWithReview.reviewId}
                    hotel={hotelWithReview}
                />
            ))}
        </section>
    );
}

export default ReviewsGrid;
