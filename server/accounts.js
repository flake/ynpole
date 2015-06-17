Accounts.validateLoginAttempt(function(attempt){
	if(attempt.type === "password" && attempt.user && attempt.user.emails && !attempt.user.emails[0].verified){
		throw new Meteor.Error(attempt.user._id, 'Email not verified');
	}
	return true;
});

Meteor.methods({
	'send-email-verification': function(userId){
		Accounts.sendVerificationEmail(userId);
	}
});