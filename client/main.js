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
	Accounts.verifyEmail(token, function(err){
		if(err != null){
			if(err.message == 'Verify email link expired [403]'){
				Accounts.sendVerificationEmail(Meteor.userId());
				console.log('Sorry this verification link has expired. Resent the new link for confirmation');
			}
		}else{
			console.log('Thank you! Your email address has been confirmed.');
			done();
		}
	});
})