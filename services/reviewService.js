async function getReviewsByHotelId(id) {
    const url = `${import.meta.env.VITE_BASE_URL}/reviews?onHotel=${id}`;
    const response = await fetch(url);
    const result = await response.json();

    return result.reviews;
}

async function getRandomReviews() {
    const url = `${import.meta.env.VITE_BASE_URL}/reviews?byRandom=true`;
    const response = await fetch(url);
    const result = await response.json();

    return result.reviews;
}

async function getReviewsByUserId(id) {
    const url = `${import.meta.env.VITE_BASE_URL}/reviews?byUser=${id}`;
    const response = await fetch(url);
    const result = await response.json();

    return result.reviews;
}

async function putReview(user, reviewData) {
    const { _id, ...updatedReviewData } = reviewData;

    const userConfirmation = confirm(
        'Are you sure you want to edit this review?'
    );

    if (!userConfirmation) {
        return;
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(updatedReviewData),
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    const url = `${import.meta.env.VITE_BASE_URL}/reviews/${_id}`;
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.message) {
        alert(`Something went wrong: ${result.message}`);
        return;
    } else {
        alert(`Review with ID ${_id} edited successfully!`);
    }

    return result;
}

async function deleteReview(user, id) {
    const userConfirmation = confirm(
        'Are you sure you want to delete this review? This is irreversible!'
    );

    if (!userConfirmation) {
        return;
    }

    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    const url = `${import.meta.env.VITE_BASE_URL}/reviews/${id}`;
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.deletedCount === 1) {
        alert(`Review with ID ${id} deleted!`);
        return result.deletedCount;
    } else {
        return alert(`Something went wrong: ${result.message}`);
    }
}

export default {
    getReviewsByHotelId,
    getReviewsByUserId,
    getRandomReviews,
    putReview,
    deleteReview
};
