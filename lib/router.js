Router.configure({
	layoutTemplate: 'layout',
    loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.map(function(){
	this.route('appLaunch', {
		path: '/',
		template: 'home',
		yieldTemplates: {
			'appLeft': {to: 'leftTemplate'},
			'appRight': {to: 'rightTemplate'}
		},
		data: function(){
			return { posts: Posts.find({}, {sort: {created_at: -1}}) }
		}
	});
/*	this.route('signup', {
		path: '/signup',
		onBeforeAction: function(){
			if(Meteor.user()){
				this.redirect('/');
			}else{
				this.layout('landing');
				this.next();
			}
		}
	}); */

	this.route('addQuest', {
		path: '/addQuestion'
	});

	this.route('profile', {
		path: '/:_id',
		yieldTemplates: {
			userLeft: {to: 'leftTemplate'},
			userRight: {to: 'rightTemplate'}
		},
		notFoundTemplate: 'notFound',
		waitOn: function(){
			var userId = this.params._id;
			Session.set('activity_show', 'all');
			Session.set('edit_title', false);
			Session.set('edit_about', false);
			Deps.autorun(function(){
				Meteor.subscribe('userInfo', userId);
			});
		},
		data: function(){
			var userId = this.params._id;

			var user = Meteor.users.findOne(userId);
			if(!user){
				this.layout('nolayout');
				this.render('notFound');
			}
			else
				return user;
		}
	});

	this.route('question', {
		path: '/question/:_id',
		data: function(){
			return Posts.findOne(this.params._id);
		}
	});

	this.route('profileNotFound', {
		path: '/profile/*',
		layoutTemplate: 'nolayout',
		template: 'notFound'
	});

	this.route('notFound', {
		path: '/*',
		layoutTemplate: 'nolayout'
	});
});

var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause){
    	if(Session.get('passwd-reset-token')){
    		Meteor.logout();
    		this.layout('landing');
    		this.render('resetPassword');
    	}else{
    		if(!Meteor.user()){
	    		this.layout('landing');
	    		this.render('signup');
	    		this.render('login', {to: 'loginTemplate'});
	    	}else{
	    		this.next();
	    	}
    	}
    /*	if(Meteor.loggingIn()){
    		if(Session.get('login-loading')){
				this.layout('landing');
				this.render(this.loadingTemplate);
			}
    	} */
    }
};

Router.before(OnBeforeActions.loginRequired, {
   except: ['question']
});