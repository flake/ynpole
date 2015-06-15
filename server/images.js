var postImages = new FS.Store.S3("posts", {
  accessKeyId: "AKIAJ7635KVQWPPWGN3Q",
  secretAccessKey: "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",
  bucket: "ynpole",
  transformWrite: function(fileObj, readStream, writeStream){
    gm(readStream, fileObj.name()).resize('580>', '275>').stream().pipe(writeStream);
  },
  maxTries: 2
});

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