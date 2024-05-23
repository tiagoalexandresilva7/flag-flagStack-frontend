async function getBookingById(user, bookingId) {
    const options = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    const url = `http://localhost:3000/bookings/${bookingId}`;
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

async function getBookingsByUserId(user) {
    const options = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    const url = `http://localhost:3000/bookings?byUser=${user.id}`;
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

async function putBooking(user, bookingData) {
    const { _id, ...updatedBookingData } = bookingData;

    const options = {
        method: 'PUT',
        body: JSON.stringify(updatedBookingData),
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    const url = `http://localhost:3000/bookings/${_id}`;
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

function getTotalPrice(
    pricePerNight,
    pricePerGuest,
    checkIn,
    checkOut,
    numberOfGuests
) {
    const dayInMiliseconds = 24 * 60 * 60 * 1000;
    const numberOfNights = Math.ceil((checkOut - checkIn) / dayInMiliseconds);

    const totalGuestsPrice = pricePerGuest * numberOfGuests;
    const totalNightsPrice = pricePerNight * numberOfNights;

    const total = totalGuestsPrice + totalNightsPrice;

    return total;
}

export default {
    getBookingById,
    getBookingsByUserId,
    putBooking,
    getTotalPrice,
};
