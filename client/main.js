Meteor.subscribe("posts");
Meteor.subscribe("comments");
Meteor.subscribe('activities');
Meteor.subscribe('follows');
Meteor.subscribe('profiles');
Meteor.subscribe('images');
Meteor.subscribe('notifications');
Meteor.subscribe('gcontacts', Meteor.userId());

Accounts.onEmailVerificationLink(function(token, done){
	if(token){
		Accounts.verifyEmail(token, function(err){
			if(err != null){
				if(err.message == 'Verify email link expired [403]'){
					var user = Meteor.users.find({"services.email.verificationTokens":{ $elemMatch: { token: token}}});
					var userId = false;
					if(user)
						userId = user._id;

					var data = {
						title: "Email verification link expired!",
						modalTemplate: "verifyEmailExpired",
						modalData: {userId: user._id}
					};

					$('.modal-dialog').empty();
					Blaze.renderWithData(Template.bsmodal, data, $('.modal-dialog')[0]);
					$('#verifyModal').modal('show');
					console.log('Sorry this verification link has expired. Resend the new link for confirmation?');
				}
			}else{
				console.log('Thank you! Your email address has been confirmed.');
				done();
			}
		});
	}
});

Accounts.onEnrollmentLink(function(token, done){
	if(token){
		Session.set('passwd-reset-token', token);
		console.log("passwd-reset-token set: "+token);
	}
	done();
});

Meteor._reload.onMigrate(function() {
    return [false];
});