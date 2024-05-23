import { useState } from 'react';
import { Link, useLocation } from 'wouter';

function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useLocation();

    async function loginHandler(event) {
        event.preventDefault();

        const body = {
            email: email,
            password: password,
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        const url = 'http://localhost:3000/auth';
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);

        if (result.token) {
            const user = {
                id: result.id,
                token: result.token,
            };

            localStorage.setItem('user', JSON.stringify(user));

            setLocation('/');
        }
    }

    return (
        <main className="container min-h-screen">
            <h1 className="text-center">Login</h1>
            <section className="flex justify-center">
                <form onSubmit={loginHandler}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        aria-label="Login"
                        autoComplete="email"
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        aria-label="Password"
                        autoComplete="current-password"
                        required
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </section>
            <section className="flex place-items-center place-content-center gap-4">
                <p className="mb-0">Don't have an account?</p>
                <Link to="/signup">
                    <button>Sign up</button>
                </Link>
            </section>
        </main>
    );
}

export default LoginView;
