function HotelRatings({ ratings }) {
    return (
        <section>
            <p className="mb-0">
                Food:{' '}
                {Array.from({ length: ratings.food }, (_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                ))}
            </p>
            <p className="mb-0">
                Location:{' '}
                {Array.from({ length: ratings.location }, (index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                ))}
            </p>
            <p className="mb-0">
                Presentation:{' '}
                {Array.from(
                    {
                        length: ratings.presentationAndCleanliness,
                    },
                    (index) => (
                        <i key={index} className="fa-solid fa-star"></i>
                    )
                )}
            </p>
            <p className="mb-0">
                Features:{' '}
                {Array.from(
                    {
                        length: ratings.servicesAndFeatures,
                    },
                    (index) => (
                        <i key={index} className="fa-solid fa-star"></i>
                    )
                )}
            </p>
        </section>
    );
}

export default HotelRatings;
