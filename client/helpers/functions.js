readURL = function(input){
	if(input.files && input.files[0]){
		var reader = new FileReader();
		var file = input.files[0];

		reader.onload = function(e){
			Session.set('img_src', e.target.result);
		}

		reader.readAsDataURL(file);
	}
}

/*verifyEmail = function(userId){
	if(Accounts._verifyEmailToken){
		Accounts.verifyEmail(Accounts._verifyEmailToken, function(err){
			if(err != null){
				if(err.message == 'Verify email link expired [403]'){
					Blaze.renderWithData(Template.bsmodal, {title: "Email verification link expired!", verifyEmailExpired: true, userId: userId}, $('.modal-dialog')[0]);
					$('#verifyModal').modal('show');
					console.log('Sorry this verification link has expired. Resend the new link for confirmation?');
				}
			}else{
				console.log('Thank you! Your email address has been confirmed.');
			}
		});
	}
} */