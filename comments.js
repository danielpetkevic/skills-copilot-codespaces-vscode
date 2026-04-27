// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url);
    var pathname = parsedUrl.pathname;

    if (pathname === '/') {
        // Read comments from file
        fs.readFile('comments.json', 'utf8', function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            var comments = JSON.parse(data);
            var html = '<h1>Comments</h1><ul>';
            comments.forEach(function (comment) {
                html += '<li>' + comment + '</li>';
            });
            html += '</ul><form method="POST" action="/add"><input type="text" name="comment"><button type="submit">AddComment</button></form>';  
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    } else if (pathname === '/add' && req.method === 'POST') {
        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            var postData = querystring.parse(body);
            var comment = postData.comment;

            // Read existing comments, add new comment, and write back to file
            fs.readFile('comments.json', 'utf8', function (err, data) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }

                var comments = JSON.parse(data);
                comments.push(comment);
                fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                        return;
                    }
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                });
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, function () {
    console.log('Server is listening on port 3000');
});
