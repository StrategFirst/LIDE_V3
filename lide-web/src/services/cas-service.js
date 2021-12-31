import API from "./service.js";

function login(username, password) {
	return API.post('/CAS', { username, password } );
}

export default {
    login,
};
