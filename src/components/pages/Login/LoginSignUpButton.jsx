import { Link } from 'wouter';

function LoginSignUpButton() {
    return (
        <section className="flex place-items-center place-content-center gap-4">
            <p className="mb-0">Don't have an account?</p>
            <Link to="/signup">
                <button>Sign up</button>
            </Link>
        </section>
    );
}

export default LoginSignUpButton;
