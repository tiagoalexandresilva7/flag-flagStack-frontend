function TextReview({ textReview, handleEditReview }) {
    return (
        <label>
            Review
            <textarea
                name="textReview"
                aria-label="Text Review"
                value={textReview}
                onChange={handleEditReview}
                rows="10"
            ></textarea>
        </label>
    );
}

export default TextReview;
