function ProfileAccountSettingsUpdateForm({
    formUserAccData,
    setFormUserAccData,
    formSubmitHandler,
}) {
    function formInputHandler(event) {
        setFormUserAccData({
            ...formUserAccData,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <section className="flex justify-center">
            <form onSubmit={formSubmitHandler}>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        aria-label="Login"
                        autoComplete="email"
                        value={formUserAccData?.email}
                        required
                        onChange={(event) => formInputHandler(event)}
                    />
                </label>
                <label>
                    Current password
                    <input
                        type="password"
                        name="password"
                        aria-label="password"
                        required
                        onChange={(event) => formInputHandler(event)}
                    />
                </label>
                <label>
                    New password
                    <input
                        type="password"
                        name="newPassword"
                        aria-label="newPassword"
                        onChange={(event) => formInputHandler(event)}
                    />
                </label>
                <label>
                    Confirm new password
                    <input
                        type="password"
                        name="confirmNewPassword"
                        aria-label="confirmNewPassword"
                        required
                        onChange={(event) => formInputHandler(event)}
                    />
                </label>
                <button type="submit">Update</button>
            </form>
        </section>
    );
}

export default ProfileAccountSettingsUpdateForm;
