/*Router.map(function() {
    this.route('serverFile', {
        where: 'server',
        path: /^\/img_uploads\/(.*)$/,
        action: function() {
          console.log("file path before: "+filePath);
           var filePath = process.env.PWD + '/.uploads/posts/' + this.params[1];
           console.log("file path: "+filePath);
           var data = fs.readFileSync(filePath);
           this.response.writeHead(200, {
                'Content-Type': 'image'
           });
           this.response.write(data);
           this.response.end();
        }
    });
}); */