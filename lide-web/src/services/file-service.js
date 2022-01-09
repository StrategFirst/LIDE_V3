import API from "./service.js";

function get(fileid, username) {
	return API.get(`/file/${fileid}/${username}`);
}

function create(projectid, filename, extension, username) {
	return API.post('/file', { username, projectid, filename, extension } );
}

function remove(fileid, username) {
	return API.delete(`/file/${fileid}`, { username } );
}

function rename(fileid, newfilename, extension, username) {
	return API.put(`/file/${fileid}?rename=true`, { username, newfilename, extension } );
}

function save(fileid, content, username) {
	return API.put(`/file/${fileid}?save=true`, { username, content } );
}

function execute(fileid, username) {
	return API.get(`/execute/${fileid}/${username}`);
}

export default {
	get,
	create,
	remove,
	rename,
	save,
	execute,
};
