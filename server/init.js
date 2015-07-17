Meteor.startup(function(){

	Future = Npm.require('fibers/future');

	BrowserPolicy.content.allowOriginForAll("http://meteor.local");
	BrowserPolicy.content.allowImageOrigin("*");
	//BrowserPolicy.content.allowImageOrigin("https://graph.facebook.com");
	//BrowserPolicy.content.allowImageOrigin("https://lh4.googleusercontent.com");

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

	Accounts.emailTemplates.enrollAccount.html = function(user, url){
		var sender = Meteor.user();
		var invite = Invites.find({invitee: user._id, expired: false});
		var html = '';
		var isUser = true;
		if(invite)
			isUser = false;
		var inviteeName = user.profile.name;

		if(!inviteeName)
			inviteeName = "buddy";

		var data = {
			inviteeName: inviteeName,
			urlInvite: url,
			avatarURL: sender.profile.avatar,
			urlProfile: process.env.ROOT_URL+sender._id,
			isUser: isUser
		};
		html = SSR.render('inviteTemplate', data);

		return html;
	}
});