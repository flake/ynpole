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

	'email-invite': function(email, profile){
		var user = Meteor.user();
		var userId;

		if(!validateEmail(email)){
			console.log("Invalid email: ", email);
			throw new Error(403, "Not a valid Email");
		}

		var existingUser = Meteor.users.findOne({'emails.address': email});

		if(existingUser && (existingUser._id !== user._id)){
			userId = existingUser._id;
			Meteor.call('follow', {'following_id': userId, 'following_name': existingUser.profile.name}, function(err){
				console.log("email invite error: ", err);
			});
		}
		else{
			userId = Accounts.createUser({
				email: email,
				password: Random.secret(16),
				profile: _.extend(profile, {active: false})
			});

			var invitation = {
				inviter: user._id,
				inviter_name: user.profile.name,
				invitee: userId,
				invitee_name: profile.name,
				expired: false,
				created_at: new Date().getTime()
			}

			Invites.insert(invitation);
		}

		Accounts.sendEnrollmentEmail(userId);
		return userId;
	}
});