const PROTOCOL = 'https';
const HOSTNAME = window.location.hostname;
const PORT = '10000';
const VERSION = 'v1';

const API = {
	get: (endpoint) => send('GET', endpoint),

	post: (endpoint, data) => send('POST', endpoint, data),
	put: (endpoint, data) => send('PUT', endpoint, data),
	delete: (endpoint, data) => send('DELETE', endpoint, data),
};

function send(method, endpoint, data) {
	return fetch(`${PROTOCOL}://${HOSTNAME}:${PORT}/api/${VERSION}${endpoint}`,{
		method: method,
		headers: {'Content-Type': 'application/json'},
		body: ( data ) ? JSON.stringify(data) : undefined
    });
}

export default API;
