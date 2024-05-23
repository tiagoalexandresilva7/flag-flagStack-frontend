import { Link } from 'wouter';

function Card({ id, name, city, price, poster }) {
    return (
        <article>
            <header>
                <figure>
                    <img src={poster} alt={name} />
                </figure>
            </header>
            <section className="h-48">
                <h2>{name}</h2>
                <h5>{city}</h5>
                <p>
                    <span className="font-bold">{price}€</span> /{' '}
                    <span className="italic">night</span>
                </p>
            </section>
            <footer>
                <Link to={`/hotel/${id}`}>
                    <button>Go to Hotel</button>
                </Link>
            </footer>
        </article>
    );
}

export default Card;
