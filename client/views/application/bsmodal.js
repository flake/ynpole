Template.bsmodal.events({
	'click .send-verify-email': function(event, template){
		var userId = $(event.currentTarget).attr('uid');
		Meteor.call('send-email-verification', userId, function(error, result){
			if(error){
				$('.modal-dialog').empty();
				Blaze.renderWithData(Template.bsmodal, {title: "Verification Email error!", modalTemplate: "verifyEmailError", modalData: {error: error.reason}}, $('.modal-dialog')[0]);
			}else{
				$('.modal-dialog').empty();
				Blaze.renderWithData(Template.bsmodal, {title: "Verification Email sent", modalTemplate: "verifyEmailSent"}, $('.modal-dialog')[0]);
			}
		});
	}
});