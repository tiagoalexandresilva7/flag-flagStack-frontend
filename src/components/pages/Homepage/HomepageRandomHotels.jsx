import { useEffect, useState } from 'react';
import hotelService from '../../../../services/hotelService';

import LoadingSpinner from '../../ui/LoadingSpinner';
import HomepageHeading from './HomepageHeading';
import HomepageRandomHotelsGrid from './HomepageRandomHotelsGrid';

function HomepageRandomHotels() {
    const [isLoading, setIsLoading] = useState(true);
    const [randomHotels, setRandomHotels] = useState();

    useEffect(() => {
        (async () => {
            const response = await hotelService.getRandomHotels();

            setRandomHotels(response.hotels);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    } else {
        return (
            <main className="mt-4 container">
                <HomepageHeading />
                <HomepageRandomHotelsGrid randomHotels={randomHotels} />
            </main>
        );
    }
}
export default HomepageRandomHotels;
