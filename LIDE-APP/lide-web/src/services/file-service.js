import API from "../configs/api";

function get(fileid) {
	return API.get(`/file/${fileid}/${localStorage.username}`);
}

function create(projectid, filename, extension) {
	return API.post('/file',
		{
			username: localStorage.username,
			projectid: projectid,
			filename: filename,
			extension: extension,
		}
	)
}

function remove(fileid) {
	return API.delete(`/file/${fileid}`,
		{
			username: localStorage.username
		}
	);
}

function rename(fileid, newfilename, extension) {
	return API.put(`/file/${fileid}?rename=true`,
		{
			username: localStorage.username,
			newfilename: newfilename,
			extension: extension
		}
	);
}

function save(fileid, content) {
	return API.put(`/file/${fileid}?save=true`,
		{
			username: localStorage.username,
			content: content,
		}
	);
}

function execute(fileid) {
	return API.get(`/execute/${fileid}/${localStorage.username}`);
}

export default {
	get,
	create,
	remove,
	rename,
	save,
	execute,
};
