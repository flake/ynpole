Template.signup.events({
	'click #facebook-login': function(event, template){
		Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile', 'user_friends']},
			function(err){
				if(err){
					return console.log(err);
				}
			});
	},

	'click #google-login': function(event, template){
		Meteor.loginWithGoogle({ requestPermissions: ['email', 'profile']},
			function(err){
				if(err)
					return console.log(err);
			});
	},

	'submit form': function(event, template){
		event.preventDefault();
		var emailVar = template.find('#register-email').value;
		var passwordVar = template.find('#register-password').value;
		var nameVar = template.find('#register-fullname').value;
		var dobVar = template.find('#register-dob').value;
		var genderVar = template.find('input:radio[name=reg-gender]:checked').value;

		Accounts.createUser({
			email: emailVar,
			password: passwordVar,
			profile: {
				name: nameVar,
				dob: dobVar,
				gender: genderVar,
				town: '',
				title: '',
				about: '',
				education: ''
			}
		});
	}
});