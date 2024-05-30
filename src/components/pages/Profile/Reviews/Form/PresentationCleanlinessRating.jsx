function PresentationCleanlinessRating({ rating, handleEditReview }) {
    const options = [1, 2, 3, 4, 5];

    return (
        <fieldset>
            <legend>And the overall presentation and cleanliness?</legend>
            {options.map((option, index) => (
                <>
                    <input
                        key={index}
                        type="radio"
                        id={option}
                        name="ratings.presentationAndCleanliness"
                        value={option}
                        defaultChecked={rating == option}
                        onChange={handleEditReview}
                    />
                    <label htmlFor={option}>{option}</label>
                </>
            ))}
        </fieldset>
    );
}

export default PresentationCleanlinessRating;
