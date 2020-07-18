export const LOGIN = 'login';
export const LOGOUT = 'logout';

export const login = data => {
	return {
		type: LOGIN,
		data
	};
};

export const logout = () => {
	return {
		type: LOGOUT
	};
};