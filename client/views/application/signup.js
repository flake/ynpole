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
		validateForm(event.currentTarget);

		if(isAllValid()){
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
			}, function(error){
				if(error.error === "email"){
					$('#register-email').css("border", "1px solid #CF4E4E");
					$('#register-email').siblings(".errspan").css("visibility", "visible");
				}
			});
		}
	},

	'blur .validate-input': function(event, template){
		event.preventDefault();
		validateInput(event.currentTarget);
	},

	'focus .validate-input':function(event, template){
		event.preventDefault();
		var formField = event.currentTarget;
		var fieldId = $(formField).attr('id');
		if(errorStates.get(fieldId)){
			$(formField).css("border", "1px solid #D0D1D5");
			$(formField).siblings(".errspan").css("visibility", "hidden");
		}
	},

	'click .radio-label': function(event, template){
		if(validateGender()){
			$('.radio-label').css("border", "1px solid #D0D1D5");
			$('#errGen').css("visibility", "hidden");
		}
	}
});

Template.signup.created = function(){
	errorStates = initErrorStates();
}

function initErrorStates(){
	var states = new ReactiveMap();

	states.allValid = function(){
		for(var key in states.keys){
			if(states.get(key) == true)
				return false;
		}
		return true;
	}
	return states;
}

function validateInput(formField){
	var fieldValue = $(formField).val();
	var fieldId = $(formField).attr('id');
	var validate = toTitleCase($(formField).attr('validate'));
	var valid = this['validate'+validate](fieldValue);
	errorStates.set(fieldId, !valid);

	if(!valid){
		$(formField).css("border", "1px solid #CF4E4E");
		$(formField).siblings(".errspan").css("visibility", "visible");
	}

	return valid;
}

function validateGender(){
	var genValid = true;
	if(gender = $('input:radio[name=reg-gender]:checked').val()){
		genValid = gender == "Male" || gender == "Female";
	}
	errorStates.set("gender", !genValid);
	if(!genValid){
		$('.radio-label').css("border", "1px solid #CF4E4E");
		$('#errGen').css("visibility", "visible");
	}

	return genValid;
}

function validateForm(target){
	$('.validate-input', target).each(function(){
		validateInput(this);
	});

	validateGender();
}

function isAllValid(){
	var keys = errorStates.keys();
	for(i=0; i<keys.length; i++){
		if(errorStates.get(keys[i]) == true)
			return false;
	}
	return true;
}