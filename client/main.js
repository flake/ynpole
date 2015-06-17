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
				/*	$('.modal-title').text('Email verification link expired!');
					$('.modal-body p').html('Sorry! this verification link has expired. <a href="/">Click here</a> to resend the new link for Email verification.');
					$('#verifyModal').modal('show'); */
					Blaze.renderWithData(Template.bsmodal, {title: "Email verification link expired!", verifyEmailExpired: true, userId: Meteor.userId()}, $('.modal-dialog')[0]);
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