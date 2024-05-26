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
            <p>
                {/* {hotel.description} */}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laudantium veritatis facilis reiciendis, minus voluptate labore
                molestias amet, dolorem unde doloribus perferendis maxime,
                consectetur ut rem. Fugiat itaque rem consequatur. Dolor. Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. Nihil quis
                quidem perspiciatis laboriosam expedita aut rem! Reiciendis fuga
                quo possimus tempore quod nesciunt qui animi aperiam, asperiores
                vitae culpa ipsum? Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Laudantium veritatis facilis reiciendis, minus
                voluptate labore molestias amet, dolorem unde doloribus
                perferendis maxime, consectetur ut rem. Fugiat itaque rem
                consequatur. Dolor. Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Nihil quis quidem perspiciatis laboriosam
                expedita aut rem! Reiciendis fuga quo possimus tempore quod
                nesciunt qui animi aperiam, asperiores vitae culpa ipsum?
            </p>
        </section>
    );
}

export default HotelDescription;
