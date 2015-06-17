Template.bsmodal.events({
	'click .send-verify-email': function(event, template){
		alert("userId: "+template.data.userId);
		Meteor.call('send-email-verification', template.data.userId, function(error, result){
			if(error){
				$('.modal-dialog').empty();
				Blaze.renderWithData(Template.bsmodal, {title: "Verification Email error!", verifyEmailError: true, error: error.reason}, $('.modal-dialog')[0]);
			}else{
				$('.modal-dialog').empty();
				Blaze.renderWithData(Template.bsmodal, {title: "Verification Email sent", verifyEmailSent: true}, $('.modal-dialog')[0]);
			}
		});
	}
});