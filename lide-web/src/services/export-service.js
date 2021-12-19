import API from "./service.js";

function exporter() {
	return API.get(`/export/${localStorage.username}`);
}

export default {
	exporter,
};
