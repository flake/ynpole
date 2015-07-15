Template._googleContacts.helpers({
	gContacts: function(){
		return Gcontacts.find({user_id: Meteor.userId()});
	},

	gcount: function(){
		return Gcontacts.find({user_id: Meteor.userId()}).count();
	},

	gphoto: function(photoUrl){
		var gdata = ReactiveMethod.call('gphoto', photoUrl);
		var gsrc = "data:image/*;base64, " + gdata;
		return gsrc;
	}
});

Template._googleContacts.events({
	'click [data-action=import-gcontacts]': function(event, template){
		var user = Meteor.users.findOne({_id: Meteor.userId()});

		if(!user.services.google){
			Meteor.loginWithGoogle({
				requestPermissions: ['email', 'profile', 'https://www.google.com/m8/feeds'],
				requestOfflineToken: true,
				forceApprovalPrompt: true },
				function(err){
					if(err)
						return console.log(err);
			});
		}
		Meteor.call('gcontacts', Meteor.user());
	},

	'click #check-all': function(event, template){
		var checks = $('.check-contact');
		checks.prop("checked", $(event.currentTarget).prop("checked"));
		Session.set('invite-email-valid', $(event.currentTarget).prop("checked"));
	},

	'click .check-contact': function(event, template){
		var checks = $('.check-contact:checked');
		if(checks.length)
			Session.set('invite-email-valid', true);
		else
			Session.set('invite-email-valid', false);
	}
});

Template._googleContacts.rendered = function(){
}