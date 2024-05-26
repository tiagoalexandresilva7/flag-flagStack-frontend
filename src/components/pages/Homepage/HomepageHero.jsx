import { Link } from 'wouter';

function HomepageHero() {
    return (
        <section>
            <div className="min-h-screen bg-[url('/hero.jpg')] bg-cover flex flex-row items-center justify-center">
                <div className="text-center">
                    <div className="max-w-screen-md">
                        <h1 className="text-4xl font-bold italic text-white drop-shadow-lg">
                            Discover Your Perfect Stay
                        </h1>
                        <p className="text-white drop-shadow-lg">
                            Simplify your travel planning with our intuitive
                            hotel booking app. Discover a world of
                            accommodations at your fingertips. With just a few
                            taps, you can compare prices, read reviews, and book
                            your perfect stay - all while enjoying a seamless,
                            hassle-free experience!
                        </p>
                        <Link to="/search">
                            <button>Search Hotels</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomepageHero;
