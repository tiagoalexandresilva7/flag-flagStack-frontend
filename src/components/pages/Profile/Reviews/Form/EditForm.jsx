import Heading from './Heading';
import SubmittedAt from './SubmittedAt';
import TextReview from './TextReview';
import FoodRating from './FoodRating';
import LocationRating from './LocationRating';
import PresentationCleanlinessRating from './PresentationCleanlinessRating';
import ServicesFeaturesRating from './ServicesFeaturesRating';

function EditForm({
    review,
    handleEditReview,
    handleEditReviewFormSubmit,
    modalRef,
    closeEditFormModal,
}) {
    return (
        <dialog open ref={modalRef}>
            <article>
                <Heading />

                <form onSubmit={handleEditReviewFormSubmit}>
                    <SubmittedAt createdAt={review.createdAt} />

                    <TextReview
                        textReview={review.textReview}
                        handleEditReview={handleEditReview}
                    />

                    <FoodRating
                        rating={review.ratings.food}
                        handleEditReview={handleEditReview}
                    />

                    <LocationRating
                        rating={review.ratings.location}
                        handleEditReview={handleEditReview}
                    />

                    <PresentationCleanlinessRating
                        rating={review.ratings.presentationAndCleanliness}
                        handleEditReview={handleEditReview}
                    />

                    <ServicesFeaturesRating
                        rating={review.ratings.servicesAndFeatures}
                        handleEditReview={handleEditReview}
                    />

                    <button type="submit">Submit</button>
                </form>
                <footer>
                    <button onClick={() => closeEditFormModal(modalRef)}>
                        Close
                    </button>
                </footer>
            </article>
        </dialog>
    );
}

export default EditForm;
