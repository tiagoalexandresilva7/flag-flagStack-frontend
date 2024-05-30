function LocationRating({ rating, handleEditReview }) {
    const options = [1, 2, 3, 4, 5];

    return (
        <fieldset>
            <legend>How would you rate the location?</legend>
            {options.map((option, index) => (
                <>
                    <input
                        key={index}
                        type="radio"
                        id={option}
                        name="ratings.location"
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

export default LocationRating;
