import { useEffect, useState } from 'react';

import hotelService from '../../services/hotelService';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import SearchHotelsForm from '../components/pages/SearchHotels/SearchHotelsForm';
import SearchHotelsPagination from '../components/pages/SearchHotels/SearchHotelsPagination';
import SearchHotelsResults from '../components/pages/SearchHotels/SearchHotelsResults';
import SearchHotelsHeading from '../components/pages/SearchHotels/SearchHotelsHeading';

function SearchHotelsView() {
    const [isLoading, setIsLoading] = useState(true);

    const [searchFormData, setSearchFormData] = useState({
        nameOrCity: '',
        lowestPrice: '',
        highestPrice: '',
    });

    const [fetchedData, setFetchedData] = useState();

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: null,
    });

    const [delayAPICall, setDelayAPICall] = useState(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            if (delayAPICall) {
                clearTimeout(delayAPICall);
            }

            const timer = setTimeout(async () => {
                if (!isLoading) {
                    setIsLoading(!isLoading);
                }

                const response = await hotelService.getHotelsBySearchParams(
                    pagination.currentPage,
                    searchFormData
                );

                setFetchedData(response);

                setPagination({
                    ...pagination,
                    totalPages: Array.from({ length: response.totalPages }),
                });

                setIsLoading(false);
            }, 1250);

            setDelayAPICall(timer);

            return () => clearTimeout(timer);
        })();
    }, [pagination.currentPage, searchFormData]);

    return (
        <main className="container min-h-screen">
            <SearchHotelsHeading />

            <SearchHotelsForm
                searchFormData={searchFormData}
                setSearchFormData={setSearchFormData}
            />

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                fetchedData && (
                    <SearchHotelsResults hotels={fetchedData.hotels} />
                )
            )}

            {pagination.totalPages && (
                <SearchHotelsPagination
                    pagination={pagination}
                    setPagination={setPagination}
                    fetchedData={fetchedData}
                />
            )}
        </main>
    );
}

export default SearchHotelsView;
