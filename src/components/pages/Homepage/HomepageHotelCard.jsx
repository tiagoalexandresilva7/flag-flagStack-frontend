import { Link } from 'wouter';

function HomepageHotelCard({ hotel }) {
    return (
        <article>
            <header>
                <figure>
                    <img src={hotel.photos[0]} alt={hotel.name} />
                </figure>
            </header>
            <section className="h-48">
                <h2>{hotel.name}</h2>
                <h5>{hotel.city}</h5>
                <p>
                    <span className="font-bold">{hotel.pricePerNight}€</span> /{' '}
                    <span className="italic">night</span>
                </p>
            </section>
            <footer>
                <Link to={`/hotel/${hotel._id}`}>
                    <button>Go to Hotel</button>
                </Link>
            </footer>
        </article>
    );
}

export default HomepageHotelCard;
