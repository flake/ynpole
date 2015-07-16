Meteor.methods({
/*	gopts: function(user){
		prettyJSON(user);
		var opts = {
			email: user.services.google.email,
			consumerKey: '688362045263-9a64jb9flkd753o704tkjjmcv87mlfpo.apps.googleusercontent.com',
			consumerSecret: '951nSxbsNGFF-WelnaaRg1Ic',
			token: user.services.google.accessToken,
			refreshToken: user.services.google.refreshToken
		};

		return opts;
	}, */

	gcontacts: function(){
		var user = Meteor.user();
		var opts = {
			email: user.services.google.email,
			consumerKey: '864167858348-v656ur375b5iru3pqn30t4skkmhguavc.apps.googleusercontent.com',
			consumerSecret: '3xAmIDZFU75ggwuHh-F_PM-T',
			token: user.services.google.accessToken,
			refreshToken: user.services.google.refreshToken
		};

		//var result = null;

		gcontacts = new GoogleContacts(opts);

		gcontacts.refreshAccessToken(opts.refreshToken, Meteor.bindEnvironment(function(err, accessToken){
			if(err){
				console.log('gcontact.refreshToken, ', err);
				return false;
			}else{
				console.log('gcontact.access token success!');
				gcontacts.token = accessToken;
				gcontacts.getContacts(Meteor.bindEnvironment(function(err, contacts){
					if(err)
						console.log('contacts err, ', err);
					else{
						console.log('recieved contacts: ', contacts.length);
						contacts.forEach(function(contact){
							contact.user_id = user._id;
							Gcontacts.upsert({user_id: user._id, email: contact.email}, {$set: contact});
						});
					}
				}));
			}
		}));
	},

	gphoto: function(photoUrl){
		var user = Meteor.user();
		var opts = {
			email: user.services.google.email,
			consumerKey: '688362045263-9a64jb9flkd753o704tkjjmcv87mlfpo.apps.googleusercontent.com',
			consumerSecret: '951nSxbsNGFF-WelnaaRg1Ic',
			token: user.services.google.accessToken,
			refreshToken: user.services.google.refreshToken
		};

		var future = new Future();

		gcontacts = new GoogleContacts(opts);

		gcontacts.refreshAccessToken(opts.refreshToken, Meteor.bindEnvironment(function(err, accessToken){
			if(err){
				console.log('gcontact.refreshToken, ', err);
				return false;
			}else{
				console.log('gcontact.access token success!');
				gcontacts.token = accessToken;
				gcontacts.getPhoto(photoUrl, Meteor.bindEnvironment(function(err, binaryData){
					future["return"](base64_encode(binaryData));
				}));
			}
		}));

		return future.wait();
	}
});

collectionFSInsert = function(contact, bdata){
	var cfs = new FS.File(bdata);

	reader.onload = function(event){
		var result = reader.result;
		var buffer = new Uint8Array(result);

		contact.photo = buffer;

		Gcontacts.insert(contact);
		console.log("----------------> ", contact.photo);
	}

	reader.readAsDataURL(bdata);
}