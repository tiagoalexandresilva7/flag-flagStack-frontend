function LoginForm({ loginFormData, setLoginFormData, loginHandler }) {
    function inputHandler(event) {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <section className="flex justify-center">
            <form className="w-96" onSubmit={loginHandler}>
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
                <button type="submit">Login</button>
            </form>
        </section>
    );
}

export default LoginForm;
