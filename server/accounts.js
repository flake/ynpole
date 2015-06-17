Accounts.validateLoginAttempt(function(attempt){
	if(attempt.user && attempt.user.registered_emails && !attempt.user.registered_emails[0].verified){
		throw new Meteor.Error(attempt.user._id, 'Email not verified');
	}
	return true;
});

Meteor.methods({
	'send-email-verification': function(userId){
		Accounts.sendVerificationEmail(userId);
	}
});