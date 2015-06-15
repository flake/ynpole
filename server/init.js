Meteor.startup(function(){

	// Accounts email config
	Accounts.emailTemplates.from = 'Ynpole <rajasekhar@ynpole.com>';
	Accounts.emailTemplates.siteName = 'Ynpole';
	Accounts.emailTemplates.verifyEmail.subject = function(user){
		return 'Welcome to Ynpole! - Confirm Your Email address';
	};
	//Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
	Accounts.emailTemplates.verifyEmail.text = function(user, url){
		return 'click on the following link to verify your email address: ' + url;
	};
});