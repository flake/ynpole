Template.signup.events({
	'submit form': function(event, template){
		event.preventDefault();
		var emailVar = template.find('#register-email').value;
		var passwordVar = template.find('#register-password').value;
		var nameVar = template.find('#register-fullname').value;
		var townVar = template.find('#register-town').value;
		var dobVar = template.find('#register-dob').value;
		var genderVar = template.find('input:radio[name=reg-gender]:checked').value;

		Accounts.createUser({
			email: emailVar,
			password: passwordVar,
			profile: {
				name: nameVar,
				town: townVar,
				dob: dobVar,
				gender: genderVar,
				title: '',
				about: '',
				education: ''
			}
		});
	}
});