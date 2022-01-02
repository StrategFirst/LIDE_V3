import API from "./service.js";

function get() {
	return API.get(`/user/${localStorage.username}`);
}

function getUserProjects() {
	return API.get(`/user/projects/${localStorage.username}`);
}

function getProjectsFromUser(idUser) {
	return API.post('/user/projectsFrom',{usernameFrom: idUser});
}

function createUser(username,password) {
	return API.post('/user',{username,password});
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
