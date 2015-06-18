Template.inviteEmail.helpers({
	btnDisabled: function(){
		if(Session.get('invite-email-valid'))
			return "";
		
		return "disabled-btn";
	}
});

Template.inviteEmail.events({
	'keyup #email-invite-input': function(event, template){
		var email = $('#email-invite-input').val();

		if(validateEmail(email))
			Session.set('invite-email-valid', true);
		else
			Session.set('invite-email-valid', false);
	},

	'click #email-invite-btn': function(event, template){
		var email = $('#email-invite-input').val();
		if(validateEmail(email)){
			Meteor.call('email-invitation', email, {});
		}
	}
});

Template.inviteEmail.created = function(){
	Session.set('invite-email-valid', false);
}