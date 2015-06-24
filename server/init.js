Meteor.startup(function(){

	// Accounts email config
	Accounts.emailTemplates.from = 'Ynpole <rajasekhar@ynpole.com>';
	Accounts.emailTemplates.siteName = 'Ynpole';
	Accounts.emailTemplates.verifyEmail.subject = function(user){
		return 'Welcome to Ynpole! - Confirm Your Email address';
	};
	//Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
	Accounts.emailTemplates.verifyEmail.html = function(user, url){
		var data = {
			urlInvite: url
		}
		var html = SSR.render('welcomeTemplate', data);

		return html;
	};

	Accounts.emailTemplates.enrollAccount.subject = function(user){
		return "Join me on Ynpole";
	}
/*	Accounts.emailTemplates.enrollAccount.text = function(user, url){
		return "Your friend has invited you to join him on Ynpole. To activate your account click the link below "+url;
	} */

	Accounts.emailTemplates.enrollAccount.html = function(user, url){
		var data = {
			urlInvite: url,
			avatarURL: userAvatar
		};
		var html = SSR.render('inviteTemplate', data);
		
		return html;
	}
});