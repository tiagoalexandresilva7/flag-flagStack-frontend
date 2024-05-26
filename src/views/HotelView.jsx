import { useEffect, useState } from 'react';

import hotelService from '../../services/hotelService';
import reviewService from '../../services/reviewService';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import HotelGallery from '../components/pages/Hotel/HotelGallery';
import HotelDescription from '../components/pages/Hotel/HotelDescription';
import HotelBookButton from '../components/pages/Hotel/HotelBookButton';
import HotelReviews from '../components/pages/Hotel/HotelReviews';

function HotelView({ hotelId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hotel, setHotel] = useState();
    const [hotelReviews, setHotelReviews] = useState();

    useEffect(() => {
        (async () => {
            const hotel = await hotelService.getHotelById(hotelId);
            setHotel(hotel);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const reviews = await reviewService.getReviewsByHotelId(hotelId);
            setHotelReviews(reviews);

            setIsLoading(false);
        })();
    }, [hotel]);

    if (isLoading) {
        return <LoadingSpinner />;
    } else {
        return (
            <section className="container">
                <HotelGallery hotelName={hotel.name} photos={hotel.photos} />
                <HotelDescription hotel={hotel} />
                <HotelBookButton hotelId={hotelId} />
                <HotelReviews reviews={hotelReviews} />
            </section>
        );
    }
}

export default HotelView;
