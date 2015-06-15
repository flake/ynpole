Accounts.validateLoginAttempt(function(attempt){
	if(attempt.user && attempt.user.registered_emails && !attempt.user.registered_emails[0].verified){
		console.log('Email not verified!');

		return false;
	}
	return true;
});