import HotelCard from '../Homepage/HomepageHotelCard';

function SearchHotelsResults({ hotels }) {
    return (
        <section className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 text-center">
            {hotels?.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
            ))}
        </section>
    );
}

export default SearchHotelsResults;
