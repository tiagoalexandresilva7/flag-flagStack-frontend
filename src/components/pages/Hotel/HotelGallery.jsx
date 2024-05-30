function HotelGallery({ hotelName, photos }) {
    return (
        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-center">
            {photos?.map((photo, index) => (
                <img
                    className="w-full h-full"
                    src={`${import.meta.env.VITE_BASE_URL}/${photo}`}
                    key={index}
                    alt={`${hotelName} photo ${index + 1}`}
                />
            ))}
        </section>
    );
}

export default HotelGallery;
