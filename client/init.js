Meteor.startup(function() {
  // Potentially prompts the user to enable location services. We do this early
  // on in order to have the most accurate location by the time the user shares
  //Geolocation.currentLocation();
  Session.set('img_src', '');
  Session.set('srv_img', '');

/*  Uploader.finished = function(index, fileInfo, templateContext){
  	Session.set('srv_img', fileInfo.name);
  	alert("init session set "+ fileInfo.name);
  } */
});
