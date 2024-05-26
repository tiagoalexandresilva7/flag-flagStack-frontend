import { Link } from 'wouter';

function HotelBookButton({ hotelId }) {
    return (
        <section className="text-center mt-8">
            <Link className="text-white" to={`/book/${hotelId}`}>
                <button>Book now!</button>
            </Link>
        </section>
    );
}

export default HotelBookButton;
