async function getUserById(user) {
    const options = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    const url = `http://localhost:3000/users/${user.id}`;
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

async function postUser(user) {
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    const url = 'http://localhost:3000/users';
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

async function putUser(user, userData) {
    const options = {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    const url = `http://localhost:3000/users/${user.id}`;
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

export default { getUserById, postUser, putUser };
