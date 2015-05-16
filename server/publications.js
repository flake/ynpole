Meteor.publish('posts', function(){
	return Posts.find();
});

Meteor.publish('userInfo', function(userId){
	return Meteor.users.find(userId);
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