import API from "service";

function get() {
	return API.get(`/user/${localStorage.username}`);
}

function getUserProjects() {
	return API.get(`/user/projects/${localStorage.username}`);
}

function getProjectsFromUser(idUser) {
	return API.post('/user/projectsFrom',{usernameFrom: idUser});
}

function createUser(username) {
	return API.get(`/user/${localStorage.username}`);
}

function getAll() {
	return API.get('/user/all');
}

export default {
	get,
	getAll,
	getUserProjects,
	getProjectsFromUser,
	createUser
};
