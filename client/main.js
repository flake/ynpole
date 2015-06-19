Meteor.subscribe("posts");
Meteor.subscribe("comments");
Meteor.subscribe('activities');
Meteor.subscribe('follows');

Meteor.subscribe('profiles');

Meteor.subscribe('images');

Meteor.subscribe('notifications');

//cloudinary config
/*
$.cloudinary.config({
	cloud_name: 'rajcynosure'
}); */

Accounts.onEmailVerificationLink(function(token, done){
	if(token){
		Accounts.verifyEmail(token, function(err){
			if(err != null){
				if(err.message == 'Verify email link expired [403]'){
					var user = Meteor.users.find({"services.email.verificationTokens":{ $elemMatch: { token: token}}});
					var userId = false;
					if(user)
						userId = user._id;

					$('.modal-dialog').empty();
					Blaze.renderWithData(Template.bsmodal, {title: "Email verification link expired!", modalTemplate: "verifyEmailExpired", modalData: {userId: user._id}}, $('.modal-dialog')[0]);
					$('#verifyModal').modal('show');
					console.log('Sorry this verification link has expired. Resend the new link for confirmation?');
				}
			}else{
				console.log('Thank you! Your email address has been confirmed.');
				done();
			}
		});
	}
})