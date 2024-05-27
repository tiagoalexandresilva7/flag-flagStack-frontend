import { useEffect, useState } from 'react';

import bookingService from '../../../../services/bookingService';

import ProfileEditBooking from './ProfileEditBooking';
import ProfileBookingsTable from './ProfileBookingsTable';

function ProfileBookings({ user }) {
    const [isLoading, setIsLoading] = useState(true);

    const [bookings, setBookings] = useState();
    const [editingBooking, setEditingBooking] = useState();
    const [isBookingUpdated, setIsBookingUpdated] = useState(false);

    const [showEditBookingForm, setShowEditBookingForm] = useState(false);

    useEffect(() => {
        (async () => {
            const userBookings = await bookingService.getBookingsByUserId(user);
            setBookings(userBookings.bookings);
            // todo pagination?

            setIsLoading(false);
        })();
    }, [isBookingUpdated]);

    return (
        <details className="overflow-auto">
            <summary role="button">Bookings</summary>

            <ProfileBookingsTable
                bookings={bookings}
                setEditingBooking={setEditingBooking}
                setShowEditBookingForm={setShowEditBookingForm}
            />

            {showEditBookingForm && (
                <ProfileEditBooking
                    user={user}
                    editingBooking={editingBooking}
                    setIsBookingUpdated={setIsBookingUpdated}
                    setShowEditBookingForm={setShowEditBookingForm}
                />
            )}
        </details>
    );
}

export default ProfileBookings;
