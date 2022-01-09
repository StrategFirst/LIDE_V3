import API from "./service.js";

function exporter(username) {
	return API.get(`/export/${username}`);
}

export default {
	exporter,
};
