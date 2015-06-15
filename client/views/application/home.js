Template.home.created = function(){
	if(Accounts._verifyEmailToken){
		Accounts._verifyEmail(Accounts._verifyEmailToken, function(err){
			if(err != null){
				if(err.message == 'Verify email link expired [403]'){
					Accounts.sendVerificationEmail(Meteor.userId());
					console.log('Sorry this verification link has expired. Resent the new link for confirmation');
				}
			}else{
				console.log('Thank you! Your email address has been confirmed.');
			}
		});
	}
};