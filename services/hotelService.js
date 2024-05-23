async function getHotelById(id) {
    const url = `http://localhost:3000/hotels/${id}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
}

export default {
    getHotelById,
};
