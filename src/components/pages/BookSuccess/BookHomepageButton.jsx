import { Link } from 'wouter';

function BookHomepageButton() {
    return (
        <section className="text-center mt-8">
            <Link to="/">
                <button>Go to homepage</button>
            </Link>
        </section>
    );
}

export default BookHomepageButton;
