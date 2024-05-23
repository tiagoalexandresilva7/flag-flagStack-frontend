import { useEffect, useState } from 'react';
import Card from '../components/Card';

function SearchHotelsView() {
    const [nameOrCity, setNameOrCity] = useState('');
    const [lowestPrice, setLowestPrice] = useState('');
    const [highestPrice, setHighestPrice] = useState('');

    const [fetchedData, setFetchedData] = useState();

    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [delayAPICall, setDelayAPICall] = useState(null);

    useEffect(() => {
        (async () => {
            if (delayAPICall) {
                clearTimeout(delayAPICall);
            }

            const timer = setTimeout(async () => {
                if (!isLoading) {
                    setIsLoading(true);
                }

                let url = `http://localhost:3000/hotels?page=${currentPage}`;

                if (lowestPrice && highestPrice) {
                    url =
                        url + `&byPrice=${lowestPrice}&byPrice=${highestPrice}`;
                }

                if (nameOrCity) {
                    url = url + `&byName=${nameOrCity}`;
                }

                const response = await fetch(url);
                const result = await response.json();

                setFetchedData(result);
                setTotalPages(Array.from({ length: result.totalPages }));
                setIsLoading(false);
            }, 1250);

            setDelayAPICall(timer);

            return () => clearTimeout(timer);
        })();
    }, [currentPage, nameOrCity, lowestPrice, highestPrice]);

    function inputHandler(event) {
        if (event.target.name === 'name') {
            setNameOrCity(event.target.value);
        }

        if (event.target.name === 'lowestPrice') {
            setLowestPrice(event.target.value);
        }

        if (event.target.name === 'highestPrice') {
            setHighestPrice(event.target.value);
        }

        setCurrentPage(1);
    }

    function paginationHandler(page) {
        if (page < 1) {
            setCurrentPage(1);
            return;
        }

        if (page > fetchedData.totalPages) {
            setCurrentPage(fetchedData.totalPages);
            return;
        }

        setIsLoading(true);
        setCurrentPage(page);
    }

    return (
        <main className=" container min-h-screen">
            <h1 className="text-center">Search Hotels</h1>
            <section className="flex justify-center">
                <form className="w-full">
                    <input
                        type="search"
                        name="name"
                        placeholder="Hotel name, city..."
                        aria-label="search"
                        value={nameOrCity}
                        onChange={(event) => inputHandler(event)}
                    />
                    <fieldset className="grid gap-0 md:gap-4">
                        <input
                            type="number"
                            name="lowestPrice"
                            placeholder="Price from"
                            aria-label="number"
                            value={lowestPrice}
                            onChange={(event) => inputHandler(event)}
                        />
                        <input
                            type="number"
                            name="highestPrice"
                            placeholder="Price to"
                            aria-label="number"
                            value={highestPrice}
                            onChange={(event) => inputHandler(event)}
                        />
                    </fieldset>
                </form>
            </section>

            {isLoading ? (
                <section className="min-h-screen">
                    <section aria-busy="true"></section>
                    <h2 className="text-center mt-8">Loading...</h2>
                </section>
            ) : (
                fetchedData && (
                    <section className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 text-center">
                        {fetchedData.hotels?.map((hotel) => (
                            <Card
                                key={hotel._id}
                                id={hotel._id}
                                name={hotel.name}
                                poster={hotel.photos[0]}
                                city={hotel.city}
                                price={hotel.pricePerNight}
                            />
                        ))}
                    </section>
                )
            )}

            {totalPages && (
                <section className="flex gap-1 justify-center">
                    <button onClick={() => paginationHandler(1)}>{'<<'}</button>
                    <button onClick={() => paginationHandler(currentPage - 1)}>
                        {'<'}
                    </button>
                    {totalPages.map((page, index) => (
                        <button
                            onClick={() => paginationHandler(index + 1)}
                            key={index}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => paginationHandler(currentPage + 1)}>
                        {'>'}
                    </button>
                    <button
                        onClick={() =>
                            paginationHandler(fetchedData.totalPages)
                        }
                    >
                        {'>>'}
                    </button>
                </section>
            )}
        </main>
    );
}

export default SearchHotelsView;
