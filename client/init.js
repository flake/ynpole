Meteor.startup(function() {
  // Potentially prompts the user to enable location services. We do this early
  // on in order to have the most accurate location by the time the user shares
  //Geolocation.currentLocation();
	Session.set('srv_img', '');
	Session.set('login-loading', true);
	Session.set('DocumentTitle', 'Welcome to Ynpole');

	Deps.autorun(function(){
		document.title = Session.get("DocumentTitle");
	});

	FlashMessages.configure({
		autoHide: true,
		hideDelay: 5000,
		autoScroll: false
	});

/*  Uploader.finished = function(index, fileInfo, templateContext){
  	Session.set('srv_img', fileInfo.name);
  	alert("init session set "+ fileInfo.name);
  } */
});
