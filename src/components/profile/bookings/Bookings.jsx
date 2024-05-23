import { useState } from 'react';
import EditBooking from './EditBooking';

function Bookings({ user, bookings }) {
    const [showEditBooking, setShowEditBooking] = useState(false);
    return (
        <>
            <details className="overflow-auto">
                <summary role="button">Bookings</summary>
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
                                    <td>{booking._id}</td>
                                    <td className="flex gap-2 place-content-center">
                                        <button
                                            onClick={() => {
                                                setShowEditBooking(
                                                    !showEditBooking
                                                );
                                            }}
                                        >
                                            <i className="fa-solid fa-pen text-white"></i>
                                        </button>
                                        {showEditBooking && (
                                            <EditBooking
                                                user={user}
                                                bookingId={booking._id}
                                            />
                                        )}
                                        <button>
                                            <i className="fa-solid fa-xmark text-white"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </details>
        </>
    );
}

export default Bookings;
