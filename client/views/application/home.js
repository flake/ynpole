Template.home.rendered = function(){
	if(Session.get('first-login')){
		FlashMessages.sendSuccess('Welcome to Ynpole! An email has been sent to your email address for confirmation.');
		FlashMessages.sendWarning('You have to confirm your email before you login for the next time.');
		Session.set('first-login', false);
	}
}