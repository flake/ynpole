Meteor.startup(function(){
	smtp = {
		username: 'AKIAJVLPILSNP3RIZS5A',
		password: 'AjYkxdOoibBSZthk1d3PXSoSu9hNrjqQ0dam/5HvdEUn',
		server: 'email-smtp.us-west-2.amazonaws.com',
		port: 25
	}

	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});