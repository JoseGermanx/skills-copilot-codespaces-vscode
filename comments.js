// Create web server
// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var comments = [];

var server = http.createServer(function(req, res){
    var parseUrl = url.parse(req.url, true);
    var pathName = parseUrl.pathname;
    if(pathName === '/'){
        fs.readFile('./index.html', function(err, data){
            if(err){
                console.log(err);
                res.end('404 Not Found.');
            }else{
                res.end(data);
            }
        });
    }else if(pathName === '/comments'){
        if(req.method === 'POST'){
            var postData = '';
            req.on('data', function(chunk){
                postData += chunk;
            });
            req.on('end', function(){
                var comment = querystring.parse(postData);
                comment.time = new Date();
                comments.push(comment);
                res.writeHead(301, {
                    'Location': '/'
                });
                res.end();
            });
        }else{
            var commentList = JSON.stringify(comments);
            res.end(commentList);
        }
    }else{
        fs.readFile('.' + pathName, function(err, data){
            if(err){
                console.log(err);
                res.end('404 Not Found.');
            }else{
                res.end(data);
            }
        });
    }
});

server.listen(3000, function(){
    console.log('Server is running at port 3000.');
});