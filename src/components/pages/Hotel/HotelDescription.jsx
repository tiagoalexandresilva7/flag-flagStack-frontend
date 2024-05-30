function HotelDescription({ hotel }) {
    return (
        <section>
            <section className="grid grid-cols-2 text-center">
                <hgroup>
                    <h1>{hotel.name}</h1>
                    <h4 className="mt-4">{hotel.city}</h4>
                    <h3>{hotel.address}</h3>
                </hgroup>
                <section>
                    <hgroup>
                        <h1>{hotel.pricePerNight}€ / night</h1>
                        <h4 className="mt-4">
                            + {hotel.pricePerGuest}€ / guest
                        </h4>
                    </hgroup>
                </section>
            </section>
            <p>{hotel.description}</p>
        </section>
    );
}

export default HotelDescription;
