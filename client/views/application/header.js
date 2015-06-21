Template.ynheader.helpers({
	notificationCount: function(){
		return Notifications.find({userId: Meteor.userId(), read: false}).count();
	}
});

Template.ynheader.events({
	'click .nav-notifications': function(event, template){
		event.stopPropagation();
		$('.nav-dropdown').empty();
		var pos = $(event.currentTarget).position();
		var left = pos.left;
		var top = pos.top + 18;

		Blaze.renderWithData(Template.notifications, {}, $('.nav-dropdown')[0]);
		$('.pop-nav-dropdown').css({'top':top,'left':left, 'position':'absolute', 'transform': 'translate(-10%, 0)'});
		$('.pop-nav-dropdown').show();
	},
	'click .nav-current-user': function(event, template){
		event.stopPropagation();
		$('.nav-dropdown').empty();
		var pos = $(event.currentTarget).position();
		var left = pos.left;
		var top = pos.top + 18;

		Blaze.renderWithData(Template.userMenu, {}, $('.nav-dropdown')[0]);
		$('.pop-nav-dropdown').css({'top':top,'left':left, 'position':'absolute', 'transform': 'translate(43%, 0)'});
		$('.pop-nav-dropdown').show();
	},
	'mouseleave .pop-nav-dropdown': function(event, template){
		//$('.pop-nav-dropdown').hide();
	},
});

Template.ynheader.created = function(){
	$('.pop-nav-dropdown').hide();
}

Template.userMenu.helpers({
	userId: function(){
		return Meteor.userId();
	}
});

Template.userMenu.events({
	'click .profile-view': function(event, template){
		event.preventDefault();
		Router.go('profile', { _id: Meteor.userId() });
	},
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('/');
	}
});