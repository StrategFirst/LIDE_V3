import API from "./service.js";

function get( projectid ) {
	return API.get(`/project/${projectid}`);
}

function create( projectName ) {
	return API.post( '/project' ,
		{
			projectname: projectName,
			username: localStorage.username
		}
	);
}

function remove( projectID ) {
	return API.delete( `/project/${projectID}` ,
		{
			username: localStorage.username
		}
	);
}

function rename( projectID , newProjectName ) {
	return API.put( `/project/${projectID}?rename=true` ,
		{
			newprojectname: newProjectName,
			username: localStorage.username
		}
	);
}


export default {
	get,
	create,
	remove,
	rename,
};
