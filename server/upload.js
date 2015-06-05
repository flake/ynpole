fs = Npm.require('fs');

Meteor.methods({
	'file-upload': function(fileName, fileData){
		console.log("received file name: " + fileName + " data: " + fileData);
		fs.writeFile(POSTS_UPLOAD+fileName, fileData, new Buffer(fileData, 'binary'));
	},

	save_url: function(response){
		console.log("profile_id: "+response.profile_id);
		console.log('Add '+response.upload_data+' to the id of '+response.context);
	}
});