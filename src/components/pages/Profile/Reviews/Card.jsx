import HotelRatings from '../../Hotel/HotelRatings';

function Card({ review, editReviewButtonHandler, deleteReviewButtonHandler }) {
    return (
        <details key={review._id}>
            <summary role="button" className="outline">
                Submitted at:{' '}
                {new Date(review.createdAt).toISOString().slice(0, 10)}
            </summary>
            <h2> {review.onHotel} </h2>
            <p> {review.textReview} </p>
            <section className="grid grid-cols-2 place-items-center">
                <HotelRatings ratings={review.ratings} />
                <section className="flex flex-col md:flex-row place-items-center place-content-center gap-4">
                    <button
                        className="w-24 h-12"
                        onClick={() => editReviewButtonHandler(review)}
                    >
                        Edit
                    </button>
                    <button
                        className="w-24 h-12"
                        onClick={() => deleteReviewButtonHandler()}
                    >
                        Delete
                    </button>
                </section>
            </section>
        </details>
    );
}

export default Card;
