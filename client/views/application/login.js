Template.login.events({
	'submit form':function(event, template){
		event.preventDefault();
		var emailVar = template.find('#login-email').value;
		var passwordVar = template.find('#login-password').value;
		Meteor.loginWithPassword(emailVar, passwordVar);
	},

	'click #remember-text': function(event, template){
		var remember = $('#remember');
		remember.prop("checked", !remember.prop("checked"));
	}
});

Template.layout.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('/');
	}
});