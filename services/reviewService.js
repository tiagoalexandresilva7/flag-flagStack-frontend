async function getReviewsByHotelId(id) {
    const url = `http://localhost:3000/reviews?onHotel=${id}`;
    const response = await fetch(url);
    const result = await response.json();

    return result.reviews;
}

async function getRandomReviews() {
    const url = `http://localhost:3000/reviews?byRandom=true`;
    const response = await fetch(url);
    const result = await response.json();

    return result.reviews;
}

export default { getReviewsByHotelId, getRandomReviews };
