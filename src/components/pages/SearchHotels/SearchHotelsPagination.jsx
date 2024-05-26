function SearchHotelsPagination({
    pagination,
    setPagination,
    fetchedData,
}) {

    function paginationHandler(page) {
        if (page < 1) {
            setPagination({
                ...pagination,
                currentPage: 1,
            });

            return;
        }

        if (page > pagination.totalPages.length) {
            setPagination({
                ...pagination,
                currentPage: pagination.totalPages.length,
            });

            return;
        }

        setPagination({
            ...pagination,
            currentPage: page,
        });
    }

    return (
        <section className="flex gap-1 pt-8 justify-center">
            <button onClick={() => paginationHandler(1)}>{'<<'}</button>
            <button
                onClick={() => paginationHandler(pagination.currentPage - 1)}
            >
                {'<'}
            </button>
            {pagination?.totalPages.map((page, index) => (
                <button
                    onClick={() => paginationHandler(index + 1)}
                    key={index}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => paginationHandler(pagination.currentPage + 1)}
            >
                {'>'}
            </button>
            <button onClick={() => paginationHandler(fetchedData.totalPages)}>
                {'>>'}
            </button>
        </section>
    );
}

export default SearchHotelsPagination;
