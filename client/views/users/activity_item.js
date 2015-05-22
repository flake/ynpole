Template.activityItem.helpers({
	createdAt: function(){
		return new Date(this.created_at).toString();
	},

	post: function(){
		return Posts.findOne({_id: this.sourceId});
	}
})