import { useEffect, useState } from 'react';

import bookingService from '../../../../../services/bookingService';

import EditBooking from './EditBooking';
import Table from './Table';

function Bookings({ user }) {
    const [isLoading, setIsLoading] = useState(true);

    const [bookings, setBookings] = useState();

    const [editingBooking, setEditingBooking] = useState();
    const [isBookingUpdated, setIsBookingUpdated] = useState(false);

    const [showEditBookingForm, setShowEditBookingForm] = useState(false);

    useEffect(() => {
        (async () => {
            const userBookings = await bookingService.getBookingsByUserId(user);
            setBookings(userBookings.bookings);

            setIsLoading(false);
        })();
    }, [isBookingUpdated]);

    async function deleteBookingHandler(bookingId) {
        const response = await bookingService.deleteBooking(user, bookingId);

        if (!response) {
            return;
        }

        setBookings(bookings.filter((booking) => booking._id !== bookingId));
    }

    return (
        <details className="overflow-auto">
            <summary role="button">Bookings</summary>

            <Table
                bookings={bookings}
                setEditingBooking={setEditingBooking}
                setShowEditBookingForm={setShowEditBookingForm}
                deleteBookingHandler={deleteBookingHandler}
            />

            {showEditBookingForm && (
                <EditBooking
                    user={user}
                    editingBooking={editingBooking}
                    setIsBookingUpdated={setIsBookingUpdated}
                    setShowEditBookingForm={setShowEditBookingForm}
                />
            )}
        </details>
    );
}

export default Bookings;
