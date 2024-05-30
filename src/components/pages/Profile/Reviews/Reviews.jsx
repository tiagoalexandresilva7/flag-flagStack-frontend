import { useEffect, useRef, useState } from 'react';

import reviewService from '../../../../../services/reviewService';

import ProfileReviewsEditForm from './Form/EditForm';
import Card from './Card';

function Reviews({ user }) {
    const [reviews, setReviews] = useState();
    const [editReview, setEditReview] = useState();
    const editFormModal = useRef();

    useEffect(() => {
        (async () => {
            const response = await reviewService.getReviewsByUserId(user.id);
            setReviews(response);
        })();
    }, [handleEditReviewFormSubmit, deleteReviewButtonHandler]);

    async function editReviewButtonHandler(review) {
        setEditReview(review);
    }
    
    function handleEditReview(event) {
        if (event.target.name.includes('ratings')) {
            setEditReview({
                ...editReview,
                ratings: {
                    ...editReview.ratings,
                    [event.target.name.slice(8)]: event.target.value,
                },
            });
            
            return;
        }
        
        setEditReview({
            ...editReview,
            [event.target.name]: event.target.value,
        });
    }
    
    async function handleEditReviewFormSubmit(event, user, editReview) {
        event.preventDefault();
        
        const response = await reviewService.putReview(user, editReview);
        
        if (!response.message) {
            closeEditFormModal(editFormModal);
        }
    }
    
    async function deleteReviewButtonHandler(user, reviewId) {
        const response = await reviewService.deleteReview(user, reviewId);
    }

    function closeEditFormModal(modal) {
        modal.current.toggleAttribute('open');
        setEditReview();
    }
    
    return (
        <details>
            <summary role="button">Reviews</summary>
            <ul className="px-8">
                {reviews &&
                    reviews.map((review) => (
                        <li className="list-none" key={review._id}>
                            <Card
                                review={review}
                                editReviewButtonHandler={
                                    editReviewButtonHandler
                                }
                                deleteReviewButtonHandler={() =>
                                    deleteReviewButtonHandler(user, review._id)
                                }
                            />
                        </li>
                    ))}
            </ul>
            {editReview && (
                <ProfileReviewsEditForm
                    review={editReview}
                    handleEditReview={(event) => handleEditReview(event)}
                    handleEditReviewFormSubmit={(event) =>
                        handleEditReviewFormSubmit(event, user, editReview)
                    }
                    modalRef={editFormModal}
                    closeEditFormModal={closeEditFormModal}
                />
            )}
        </details>
    );
}

export default Reviews;
