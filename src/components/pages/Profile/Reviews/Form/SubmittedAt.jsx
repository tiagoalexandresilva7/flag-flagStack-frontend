function FormSubmittedAt({ createdAt }) {
    return (
        <label>
            Submitted at
            <input
                type="date"
                name="createdAt"
                aria-label="Submitted At"
                value={new Date(createdAt).toISOString().slice(0, 10)}
                disabled
            />
        </label>
    );
}

export default FormSubmittedAt;
