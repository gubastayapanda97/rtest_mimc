export const auth = async (login, password) => {
	const response = await fetch("http://localhost:4200/login", {
		method: 'POST',
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({'email': `${login}@email.test`, 'password': password}),
		redirect: 'follow'
	});
	return response.text();
}

export const getUserInfo = async (login) => {
	const response = await fetch(`http://localhost:4200/users?email=${login}@email.test`, {
		method: 'GET',
		redirect: 'follow'
	});
	return response.text();
};