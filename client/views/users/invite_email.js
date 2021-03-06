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
		var profile = {};
		var sender = { avatarUrl: $('.avatar-image').attr('src') };
		if(validateEmail(email)){
			Meteor.call('email-invite', email, profile, sender, function(error, userId){
				if(error){
					console.log("invite error: " + error);
				}else{
					$('#email-invite-input').val('');
					FlashMessages.sendSuccess('Email invitation has been sent.');
				}
			});
		}

		$('.check-contact:checked').each(function(index, element){
			var name = $(element).parent().siblings("h2").text();
			console.log("element value: ", element.value);
			console.log("element name: ", name);

			Meteor.call('email-invite', element.value, {name: name}, function(error, userId){});
		});
		$('.check-contact').prop("checked", false);
		$('#check-all').prop("checked", false);
		Session.set('invite-email-valid', false);
	}
});

Template.inviteEmail.created = function(){
	Session.set('invite-email-valid', false);
}