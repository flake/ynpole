var postImages = new FS.Store.S3("posts");

Images = new FS.Collection("images", {
	stores: [postImages],
	filter: {
		maxSize: 1048576,
		allow: {
			contentTypes: ['image/*']
		}
	}
});

Images.allow({
  insert:function(userId,project){
    return true;
  },
  update:function(userId,project,fields,modifier){
   return true;
  },
  remove:function(userId,project){
    return true;
  },
  download:function(){
    return true;
  }
});