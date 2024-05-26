import HotelRatings from './HotelRatings';

function HotelReviewCard({ review }) {
    return (
        <article key={review._id}>
            <section>
                <HotelRatings ratings={review.ratings} />
            </section>
            <p>{review.textReview}</p>
        </article>
    );
}

export default HotelReviewCard;
