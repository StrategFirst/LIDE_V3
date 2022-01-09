const nodemailer = require('nodemailer');

async function sendNotificationEmail(emailFrom, object, content){
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				// Il faut indiquer un Email et un mot de passe, tous les messagews du formulaire de contact seront envoyé à cet Email
				user: '',
				pass: ''
			}
		});
			
		const mailOptions = {
			from: emailFrom,
			to: 'barro.juliette@gmail.com',
			subject: object,
			text: content
		};

		transporter.sendMail(mailOptions);
}

exports.post = (req, res) => {
		const emailFrom = req.body.email;
		const object = req.body.object;
		const content = req.body.content;

		let fromAdress = "LIDE visitor <" + emailFrom + ">";
		
		try{
			sendNotificationEmail(fromAdress, object, content);
			res.status(200).json({response: "Success"});
		} catch(err){
			res.status(500).json({response: "Fail: "+err.message});
		}
};

