function LoadingSpinner() {
    return (
        <section className="pt-8 container">
            <div aria-busy="true"></div>
            <h2 className="text-center mt-8">Loading...</h2>
        </section>
    );
}

export default LoadingSpinner;
