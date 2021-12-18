import API from "service";

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
