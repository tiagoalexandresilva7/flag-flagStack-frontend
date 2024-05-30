async function getBookingById(user, bookingId) {
    const options = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    const url = `${import.meta.env.VITE_BASE_URL}/bookings/${bookingId}`;
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

    const url = `${import.meta.env.VITE_BASE_URL}/bookings?byUser=${user.id}`;
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

async function postBooking(user, bookingData) {
    const options = {
        method: 'POST',
        body: JSON.stringify(bookingData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${user.token}`,
        },
    };

    const url = `${import.meta.env.VITE_BASE_URL}/bookings`;
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

async function putBooking(user, bookingData) {
    const { _id, ...updatedBookingData } = bookingData;

    const userConfirmation = confirm(
        'Are you sure you want to edit this booking?'
    );

    if (!userConfirmation) {
        return;
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(updatedBookingData),
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    const url = `${import.meta.env.VITE_BASE_URL}/bookings/${_id}`;
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.message) {
        alert(`Something went wrong: ${result.message}`);
        return
    } else {
        alert(`Booking with ID ${_id} edited successfully!`);
    }

    return result;
}

async function deleteBooking(user, id) {
    const userConfirmation = confirm(
        'Are you sure you want to delete this booking? This is irreversible!'
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

    const url = `${import.meta.env.VITE_BASE_URL}/bookings/${id}`;
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.deletedCount === 1) {
        alert(`Booking with ID ${id} deleted!`);
        return result.deletedCount;
    } else {
        return alert(`Something went wrong: ${result.message}`);
    }
}

export default {
    getBookingById,
    getBookingsByUserId,
    getTotalPrice,
    postBooking,
    putBooking,
    deleteBooking,
};
