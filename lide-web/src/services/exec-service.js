import API from "./service.js";

function killExecution() {
	return API.post('/killexec',
		{
			username: localStorage.username,
		}
	);
}

export default {
    killExecution,
};
