Meteor.methods({
	addnew: function(contact){
		Gcontacts.upsert(contact);
	},

	gcontacts: function(user){
		var opts = {
			email: user.services.google.email,
			consumerKey: '688362045263-9a64jb9flkd753o704tkjjmcv87mlfpo.apps.googleusercontent.com',
			consumerSecret: '951nSxbsNGFF-WelnaaRg1Ic',
			token: user.services.google.accessToken,
			refreshToken: user.services.google.refreshToken
		};

		gcontacts = new GoogleContacts(opts);

		gcontacts.refreshAccessToken(opts.refreshToken, function(err, accessToken){
			if(err){
				console.log('gcontact.refreshToken, ', err);
				return false;
			}else{
				console.log('gcontact.access token success!');
				gcontacts.token = accessToken;
				gcontacts.getContacts(function(err, contacts){
					if(err)
						console.log('contacts err, ', err);
					else
						console.log(contacts);
				});
			}
		});
	}
});
