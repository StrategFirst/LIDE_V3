import API from "service";

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
