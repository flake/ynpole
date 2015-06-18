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
		console.log("Invite email: "+email);
		if(validateEmail(email))
			Session.set('invite-email-valid', true);
		else
			Session.set('invite-email-valid', false);
	}
});

Template.inviteEmail.created = function(){
	Session.set('invite-email-valid', false);
}