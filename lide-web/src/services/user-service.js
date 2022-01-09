import API from "./service.js";

function get( username ) {
	return API.get(`/user/${username}`);
}

function getUserProjects( username = '' ) {
	return API.get(`/user/projects/${username}`);
}

function createUser(username,password) {
	return API.post('/user', {username, password} );
}

function getAll() {
	return API.get('/user/all');
}

export default {
	get,
	getAll,
	getUserProjects,
	createUser
};
