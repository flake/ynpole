Meteor.publish('posts', function(){
	return Posts.find();
});

Meteor.publish('comments', function(){
	return Comments.find();
});

Meteor.publish('userInfo', function(userId){
	return Meteor.users.find(userId);
});

Meteor.publish('profiles', function(){
	return Meteor.users.find({}, {fields: {profile: 1, emails: 1}});
});

Meteor.publish('activities', function(){
	return Activities.find();
});

Meteor.publish('follows', function(){
	return Follows.find();
});

/*
Meteor.publish('userInfo', function(userId){
	Meteor.publishWithRelations({
		handle: this,
		collection: users,
		filter: _id,
		mappings: [
			{
				foreign_key: "source_id",
				collection: "posts"
			}
		]
	})
}); */