import { useState } from 'react';
import { Link, useLocation } from 'wouter';

function SignupView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useLocation();

    async function signupHandler(event) {
        event.preventDefault();

        const body = {
            email: email,
            password: password,
            role: "User"
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        const url = 'http://localhost:3000/users';
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);

        if (result.createdAt) {
            setLocation('/login');
        }

        // todo auto login, set the token and redirect to homepage
        // confirm password field

    }

    return (
        <>
            <main className="container min-h-screen">
                <h1 className="text-center">Create Account</h1>
                <section className="flex justify-center">
                    <form onSubmit={signupHandler}>
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
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        <button type="submit">Create Account</button>
                    </form>
                </section>
            </main>
        </>
    );
}

export default SignupView;
