import { Link } from "wouter";

function SignupAlreadyHasAccount() {
    return (
        <section className="flex place-items-center place-content-center gap-4">
            <p className="mb-0">Already have an account?</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </section>
    );
}

export default SignupAlreadyHasAccount;
