import { LOGIN, LOGOUT } from './action';


const initialState = {
    id: localStorage.getItem('id'),
	login: localStorage.getItem('login'),
	token: localStorage.getItem('token'),
    authStatus: localStorage.getItem('authStatus')
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
		case LOGIN:
			const { id, login, token } = action.data;
			return {
				id,
				login,
				token,
				authStatus: true
			};
		case LOGOUT:
			return {
				id: null,
				login: null,
				token: null,
				authStatus: false
			};
        default: return state
    }
}

export default reducer;