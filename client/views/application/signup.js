Template.signup.events({
	'click #facebook-login': function(event, template){
		Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile', 'user_friends', 'user_location', 'user_status']},
			function(err){
				if(err){
					return console.log(err);
				}
			});
	},

	'click #google-login': function(event, template){
		Meteor.loginWithGoogle({ requestPermissions: ['email', 'profile'], requestOfflineToken: true},
			function(err){
				if(err)
					return console.log(err);
			});
	},

	'submit form': function(event, template){
		event.preventDefault();
		validateForm(event.currentTarget);

		if(isAllValid()){
			var emailVar = template.find('#reg-email').value;
			var passwordVar = template.find('#reg-password').value;
			var nameVar = template.find('#reg-fullname').value;
			var dobVar = template.find('#reg-dob').value;
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
				if(error){
					if(error.error === "email"){
						errorStates.set('reg-email', true);
						errorStates.set('email-exist', true);
						$('#reg-email').css("border", "1px solid #CF4E4E");
						$('#reg-email').siblings(".errspan").css("visibility", "visible");
					}
				}else{
					console.log("user created successfully");
				}
			});
		}
	},

	'blur .validate-input': function(event, template){
		event.preventDefault();
		$('.err-arrow-box').css({"visibility": "hidden"});
		validateInput(event.currentTarget);
	},

	'focus .validate-input':function(event, template){
		event.preventDefault();
		var formField = event.currentTarget;
		var fieldId = $(formField).attr('id');
		if(errorStates.get(fieldId)){
			showError(fieldId, formField);
			$(formField).css("border", "1px solid #D0D1D5");
			$(formField).siblings(".errspan").css("visibility", "hidden");
		}
	},

	'click .radio-label': function(event, template){
		if(validateGender()){
			$('.radio-label').css("border", "1px solid #D0D1D5");
			$('#errGen').css("visibility", "hidden");
		}
	},

	'click #errGen': function(event, template){
		if(errorStates.get('gender')){
			showError('reg-gender', event.currentTarget);
			$('.radio-label').css("border", "1px solid #D0D1D5");
			$('#errGen').css("visibility", "hidden");
		}
	}
});

Template.signup.created = function(){
	//verifyEmail(Meteor.userId());
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
	var genValid = false;
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

function getErrMsg(field){
	if(field == "reg-email"){
		if(errorStates.get("email-exist")){
			errorStates.set("email-exist", false);
			return "An account already exists with this email address.";
		}
		return "Enter a valid email address.";
	}
	if(field == "reg-password")
		return "Enter minimum 6 characters with atleast 1 uppercase, 1 lowercase and 1 number.";
	if(field == "reg-fullname")
		return "Enter fullname with only alphabets and a space between first and last name";
	if(field == "reg-dob")
		return "Enter a valid Date from past";
	if(field == "reg-gender")
		return "Select gender from Male or Female";
}

function showError(fieldId, formField){
	var gridPos = $('.signup-grid').position();
	var fieldPos = $(formField).position();
	var top = gridPos.top + fieldPos.top;
	var right = gridPos.left + 295;
	$('.err-msg').text(getErrMsg(fieldId));
	$('.err-arrow-box').css({'top':top, 'right':right, "visibility": "visible"});
}