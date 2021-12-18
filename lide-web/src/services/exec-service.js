import API from "../configs/api";

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
