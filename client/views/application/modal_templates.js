Template.resetPassword.events({
	'submit form':function(event, template){
		event.preventDefault();
		console.log("reset password userId: "+Meteor.userId());
		var newPasswd = template.find('#new-password').value;
		var renpasswd = template.find('#renter-password').value;
		var token = Session.get('passwd-reset-token');

		if(newPasswd === renpasswd){
			Accounts.resetPassword(token, newPasswd, function(error){
				if(error){
					console.log("reset password error: "+error);
				}else{
					Session.set('passwd-reset-token', false);
					Router.go('/');
				}
			});
		}
	}
});