import { useEffect, useRef } from 'react';

function BookMap() {
    useEffect(() => {
        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
    }, []);

    return (
        <section className="mt-8 text-center">
            <h3>How to get there</h3>
            <div id='map' className="w-96"></div>
        </section>
    );
}

export default BookMap;
