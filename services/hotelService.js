async function getHotelById(id) {
    const url = `${import.meta.env.VITE_BASE_URL}/hotels/${id}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
}

async function getHotelsBySearchParams(page, searchParams) {
    const { lowestPrice, highestPrice, nameOrCity } = searchParams;

    let url = `${import.meta.env.VITE_BASE_URL}/hotels?page=${page}`;

    if (lowestPrice && highestPrice) {
        url = url + `&byPrice=${lowestPrice}&byPrice=${highestPrice}`;
    }

    if (nameOrCity) {
        url = url + `&byName=${nameOrCity}`;
    }

    const response = await fetch(url);
    const result = await response.json();

    return result;
}

async function getRandomHotels() {
    const url = `${import.meta.env.VITE_BASE_URL}/hotels?byRandom=true`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
}

export default {
    getHotelById,
    getHotelsBySearchParams,
    getRandomHotels,
};
