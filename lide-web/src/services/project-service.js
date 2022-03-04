import API from "./service.js";

function get( projectid ) {
	return API.get(`/project/${projectid}`);
}

function create( projectname , username ) {
	return API.post( '/project' , { projectname, username } );
}

function remove( projectID , username ) {
	return API.delete( `/project/${projectID}` , { username } );
}

function rename( projectID , newprojectname , username ) {
	return API.put( `/project/${projectID}?rename=true` , { username, newprojectname } );
}


export default {
	get,
	create,
	remove,
	rename,
};
