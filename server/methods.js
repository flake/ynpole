Meteor.methods({
	addnew: function(contact){
		Gcontacts.upsert(contact);
	},

	gcontacts: function(user){
		var opts = {
			email: user.services.google.email,
			consumerKey: '864167858348-v656ur375b5iru3pqn30t4skkmhguavc.apps.googleusercontent.com',
			consumerSecret: 'NRDbUt8TLzPdd0kLHvDhod7q',
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
