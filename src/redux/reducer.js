import { LOGIN, LOGOUT } from './action';


const initialState = {
    id: localStorage.getItem('id'),
	login: localStorage.getItem('login'),
	token: localStorage.getItem('token'),
	firstname: localStorage.getItem('firstname'),
	lastname: localStorage.getItem('lastname'),
	authStatus: localStorage.getItem('authStatus')
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
		case LOGIN:
			const { id, login, token, firstname, lastname } = action.data;
			return {
				id,
				login,
				token,
				firstname,
				lastname,
				authStatus: true
			};
		case LOGOUT:
			return {
				id: null,
				login: null,
				token: null,
				firstname: null,
				lastname: null,
				authStatus: false
			};
        default: return state
    }
}

export default reducer;