Template.layout.events({
	'mouseenter .pop-user': function(event, template){
		$('.pop-content').empty();
		var pos = $(event.currentTarget).position();
		var left = pos.left +220; //event.pageX -45
		var top = pos.top -80; //event.pageY -120

		if(top < 10)
			top = top+135;

		var userId = $(event.currentTarget).attr("uid");
		if(userId){
			Blaze.renderWithData(Template.userCard, Meteor.users.findOne({_id: userId}), $('.pop-content')[0]);
			$('.pop-user-card').css({'top':top,'left':left, 'position':'absolute'});
			$('.pop-user-card').show();
		}
	},

	'mouseleave .pop-user': function(event, template){
		$('.pop-user-card').hide();
	},

	'click .pop-user': function(event, template){
		$('.pop-user-card').hide();
	},

	'mouseenter .pop-user-card': function(event, template){
		$('.pop-user-card').show();
	},

	'mouseleave .pop-user-card': function(event, template){
		$('.pop-user-card').hide();
	}
});