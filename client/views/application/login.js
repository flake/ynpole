Template.login.events({
	'submit form':function(event, template){
		event.preventDefault();
		Session.set('login-loading', false);
		if(!Session.get('email-err')){
			var emailVar = template.find('#login-email').value;
			var passwordVar = template.find('#login-password').value;
			Meteor.loginWithPassword(emailVar, passwordVar, function(error){
				if(error){
					console.log("login error: "+error);
					if(error.reason === "User not found"){
						Session.set('email-err', error.reason);
						$('#login-email').css("border", "1px solid #CF4E4E");
						$('#login-email').siblings(".errspan").css("visibility", "visible");
					}
					if(error.reason === "Incorrect password"){
						Session.set('password-err', error.reason);
						$('#login-password').css("border", "1px solid #CF4E4E");
						$('#login-password').siblings(".errspan").css("visibility", "visible");
					}
					if(error.reason === "Email not verified"){
						$('.modal-dialog').empty();
						Blaze.renderWithData(Template.bsmodal, {title: "Email not verified", modalTemplate: "emailNotVerified", modalData: {userId: error.error}}, $('.modal-dialog')[0]);
						$('#verifyModal').modal('show');
					}
				}else{
					Session.set('login-loading', true);
				}
			});
		}
	},

	'click #remember-text': function(event, template){
		var remember = $('#remember');
		remember.prop("checked", !remember.prop("checked"));
	},

	'blur #login-email': function(event, template){
		event.preventDefault();
		Session.set('email-err', false);
		$('.err-arrow-box').css({"visibility": "hidden"});

		var valid = validateEmail($(event.currentTarget).val());
		if(!valid){
			Session.set('email-err', "Not a valid email address.");
			$(event.currentTarget).css("border", "1px solid #CF4E4E");
			$(event.currentTarget).siblings(".errspan").css("visibility", "visible");
		}
	},

	'focus #login-email': function(event, template){
		event.preventDefault();
		if(Session.get('email-err')){
			var gridPos = $('.login-grid').offset();
			var fieldPos = $(event.currentTarget).position();
			var top = gridPos.top + fieldPos.top;
			var right = gridPos.left -460;
			$('.err-msg').text(Session.get('email-err'));
			$('.err-arrow-box').css({'top':top, 'right':right, "visibility": "visible"});
			$(event.currentTarget).css("border", "1px solid #D0D1D5");
			$(event.currentTarget).siblings(".errspan").css("visibility", "hidden");
		}
	},

	'blur #login-password': function(event, template){
		event.preventDefault();
		Session.set('password-err', false);
		$('.err-arrow-box').css({"visibility": "hidden"});
	},

	'focus #login-password': function(event, template){
		event.preventDefault();
		if(Session.get('password-err')){
			var gridPos = $('.login-grid').offset();
			var fieldPos = $(event.currentTarget).position();
			var top = gridPos.top + fieldPos.top;
			var right = gridPos.left -460;
			$('.err-msg').text(Session.get('password-err'));
			$('.err-arrow-box').css({'top':top, 'right':right, "visibility": "visible"});
			$(event.currentTarget).css("border", "1px solid #D0D1D5");
			$(event.currentTarget).siblings(".errspan").css("visibility", "hidden");
		}
	},

	'click #forgot-passwd': function(event, template){
		event.preventDefault();
	}
});

Template.login.created = function(){
	Session.set('email-err', false);
	Session.set('password', false);
	Session.set('login-loading', false);
}