async function loginUser(user) {
    const body = {
        email: user.email,
        password: user.password,
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    const url = `${import.meta.env.VITE_BASE_URL}/auth`;
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

function setUserToken(user) {
    const token = localStorage.setItem('user', JSON.stringify(user));
    return token;
}

function getUserToken() {
    const token = JSON.parse(localStorage.getItem('user'));
    return token;
}

function logoutUser() {
    const userConfirmation = confirm('Are you sure you want to logout?');

    if (!userConfirmation) {
        return;
    }

    localStorage.removeItem('user');

    alert('Logged out successfully! Redirecting to homepage!');

    return true;
}

export default {
    loginUser,
    logoutUser,
    setUserToken,
    getUserToken,
};
