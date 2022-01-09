import API from "./service.js";

function killExecution( username ) {
	return API.post('/killexec', { username } );
}

export default {
    killExecution,
};
