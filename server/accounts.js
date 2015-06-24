Accounts.validateLoginAttempt(function(attempt){
	if(attempt.methodName === "createUser")
		return true;
	if(attempt.type === "password" && attempt.user && attempt.user.emails && !attempt.user.emails[0].verified){
		throw new Meteor.Error(attempt.user._id, 'Email not verified');
	}
	return true;
});

Meteor.methods({
	'send-email-verification': function(userId){
		Accounts.sendVerificationEmail(userId);
	},

	'email-invite': function(email, profile, sender){
		var userId;
		userAvatar = sender.avatarUrl;

		if(!validateEmail(email))
			throw new Error(403, "Email not valid");

		userId = Accounts.createUser({
			email: email,
			password: 'something',
			profile: profile
		});

		Accounts.sendEnrollmentEmail(userId);

		return userId;
	}
});