function SearchHotelsForm({ searchFormData, setSearchFormData }) {
    function inputHandler(event) {
        setSearchFormData({
            ...searchFormData,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <section className="flex justify-center">
            <form className="w-full">
                <input
                    type="search"
                    name="nameOrCity"
                    placeholder="Hotel name, city..."
                    aria-label="search"
                    value={searchFormData.nameOrCity}
                    onChange={(event) => inputHandler(event)}
                />
                <fieldset className="grid gap-0 md:gap-4">
                    <input
                        type="number"
                        name="lowestPrice"
                        placeholder="Price from"
                        aria-label="number"
                        value={searchFormData.lowestPrice}
                        onChange={(event) => inputHandler(event)}
                    />
                    <input
                        type="number"
                        name="highestPrice"
                        placeholder="Price to"
                        aria-label="number"
                        value={searchFormData.highestPrice}
                        onChange={(event) => inputHandler(event)}
                    />
                </fieldset>
            </form>
        </section>
    );
}

export default SearchHotelsForm;
