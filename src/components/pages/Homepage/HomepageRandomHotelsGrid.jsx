import HomepageHotelCard from './HomepageHotelCard';

function HomepageRandomHotelsGrid({ randomHotels }) {
    return (
        <section className="mt-4 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 text-center">
            {randomHotels.map((hotel) => (
                <HomepageHotelCard key={hotel._id} hotel={hotel} />
            ))}
        </section>
    );
}

export default HomepageRandomHotelsGrid;
