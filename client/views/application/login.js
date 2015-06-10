Template.login.events({
	'submit form':function(event, template){
		event.preventDefault();
		var emailVar = template.find('#login-email').value;
		var passwordVar = template.find('#login-password').value;
		Meteor.loginWithPassword(emailVar, passwordVar);
	},

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

	'click #email-signup' : function(event, template){
		Router.go("signup", this);
	}
});

Template.layout.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('/');
	}
});