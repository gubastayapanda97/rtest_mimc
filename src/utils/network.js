export const auth = async (login, password) => {
	const response = await fetch("http://localhost:4200/login", {
		method: 'POST',
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({'email': `${login}@email.test`, 'password': password})
	});
	return response.text();
}

export const getUserInfo = async (login) => {
	const response = await fetch(`http://localhost:4200/users?email=${login}@email.test`, {
		method: 'GET'
	});
	return response.text();
};

export const getProjects = async () => {
	const response = await fetch("http://localhost:4200/projects", {
		method: 'GET'
	});

	return response.text();
};

export const addProject = async (body) => {
	const response = await fetch("http://localhost:4200/projects", {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(body)
	});

	return response.text();
}