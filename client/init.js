Meteor.startup(function() {
  // Potentially prompts the user to enable location services. We do this early
  // on in order to have the most accurate location by the time the user shares
  //Geolocation.currentLocation();
  Session.set('srv_img', '');
  Session.set('login-loading', true);

/*  Uploader.finished = function(index, fileInfo, templateContext){
  	Session.set('srv_img', fileInfo.name);
  	alert("init session set "+ fileInfo.name);
  } */
});
