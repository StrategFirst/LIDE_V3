import API from "../configs/api";

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
