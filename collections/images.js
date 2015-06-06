Images = new FS.Collection("images", {
	stores: [new FS.Store.FileSystem("images")],
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