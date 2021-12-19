import API from "service";

function exporter() {
	return API.get(`/export/${localStorage.username}`);
}

export default {
	exporter,
};
