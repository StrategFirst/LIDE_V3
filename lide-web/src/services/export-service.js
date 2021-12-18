import API from "../configs/api";

function exporter() {
	return API.get(`/export/${localStorage.username}`);
}

export default {
	exporter,
};
