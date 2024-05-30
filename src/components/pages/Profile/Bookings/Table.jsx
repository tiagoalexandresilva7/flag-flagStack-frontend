function Table({
    bookings,
    setEditingBooking,
    setShowEditBookingForm,
    deleteBookingHandler
}) {

    
    function editButtonHandler(booking) {
        setEditingBooking(booking);
        setShowEditBookingForm(true);
    }

    return (
        <table className="striped">
            <thead>
                <tr>
                    <th scope="col">Booked at</th>
                    <th scope="col">Guests</th>
                    <th scope="col">Check-in</th>
                    <th scope="col">Check-out</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {bookings &&
                    bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.createdAt.slice(0, 10)}</td>
                            <td>{booking.numberOfGuests}</td>
                            <td>{booking.checkIn.slice(0, 10)}</td>
                            <td>{booking.checkOut.slice(0, 10)}</td>
                            <td>{booking.pricePaid}€</td>
                            <td>{booking.status}</td>
                            <td className="flex gap-2 place-content-center">
                                <button
                                    onClick={() => {
                                        editButtonHandler(booking);
                                    }}
                                >
                                    <i className="fa-solid fa-pen text-white"></i>
                                </button>
                                <button
                                    onClick={() => {
                                        deleteBookingHandler(booking._id);
                                    }}
                                >
                                    <i className="fa-solid fa-xmark text-white"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default Table;
