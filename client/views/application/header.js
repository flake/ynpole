Template.ynheader.events({
	'click .nav-current-user': function(event, template){
		$('.nav-dropdown').empty();
		var pos = $(event.currentTarget).position();
		var left = pos.left;
		var top = pos.top;

		Blaze.renderWithData(Template.userMenu, {}, $('.nav-dropdown')[0]);
		$('.pop-nav-dropdown').css({'top':top,'left':left, 'position':'absolute'});
		$('.pop-nav-dropdown').show();
	}
});

Template.userMenu.helpers({
	userId: function(){
		return Meteor.userId();
	}
});

Template.userMenu.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('/');
	}
});