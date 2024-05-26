function SignupForm({ signupFormData, setSignupFormData, signupHandler }) {
    function inputHandler(event) {
        setSignupFormData({
            ...signupFormData,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <section className="flex justify-center">
            <form className="w-96" onSubmit={signupHandler}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    aria-label="Login"
                    autoComplete="email"
                    required
                    onChange={(event) => inputHandler(event)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    aria-label="Password"
                    autoComplete="current-password"
                    required
                    onChange={(event) => inputHandler(event)}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    aria-label="Password"
                    autoComplete="current-password"
                    required
                    onChange={(event) => inputHandler(event)}
                />
                <button type="submit">Create Account</button>
            </form>
        </section>
    );
}

export default SignupForm;
