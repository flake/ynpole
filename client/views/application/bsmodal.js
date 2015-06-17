Template.bsmodal.events({
	'click .send-verify-email': function(event, template){
		Meteor.call('send-email-verification', template.data.userId, function(error, result){
			if(result){
				Blaze.renderWithData(Template.bsmodal, {title: "Verification Email sent", verifyEmailSent: true}, $('.modal-dialog')[0]);
			}
		});
	}
});