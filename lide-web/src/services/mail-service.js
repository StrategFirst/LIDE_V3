import API from "./service.js";

function sendMail(mailFrom, object, content) {
	return API.post( '/mail' ,
		{
			email: mailFrom,
			object: object,
			content: content
		}
	)
}

export default {
	sendMail
};
