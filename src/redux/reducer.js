import { LOGIN, LOGOUT } from './action';


const initialState = {
    id: localStorage.getItem('id'),
    login: localStorage.getItem('login'),
    authStatus: localStorage.getItem('authStatus')
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
		case LOGIN:
			const { id, login } = action.data;
			return {
				id,
				login,
				authStatus: true
			};
		case LOGOUT:
			return {
				id: null,
				login: null,
				authStatus: false
			};
        default: return state
    }
}

export default reducer;