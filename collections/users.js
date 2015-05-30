updateUser = function(options){
	Meteor.users.update({_id: Meteor.userId()}, {$set: options});
}