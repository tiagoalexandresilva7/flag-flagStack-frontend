import HotelGallery from '../Hotel/HotelGallery';
import HotelGoToButton from '../Hotel/HotelGoToButton';
import HotelRatings from '../Hotel/HotelRatings';

function ReviewCard({ hotel }) {
    return (
        <article className="grid grid-cols-1">
            <section>
                <section className="flex place-content-center">
                    <section className="w-1/2">
                        <hgroup>
                            <h3>{hotel.name}</h3>
                            <p className="italic">{hotel.city}</p>
                            <p>
                                <span className="font-bold">
                                    {hotel.pricePerNight}€
                                </span>{' '}
                                / night
                            </p>
                        </hgroup>
                    </section>
                    <section>
                        <HotelRatings ratings={hotel.ratings} />
                    </section>
                </section>
                <section>
                    <HotelGallery
                        hotelName={hotel.name}
                        photos={hotel.photos}
                    />
                </section>

                <p>{hotel.textReview}</p>

                <section className="text-center">
                    <HotelGoToButton hotelId={hotel.hotelId} />
                </section>
            </section>
        </article>
    );
}

export default ReviewCard;
