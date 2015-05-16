Meteor.publish('posts', function(){
	return Posts.find();
});

Meteor.publish('userInfo', function(userId){
	return Meteor.users.find(userId);
});