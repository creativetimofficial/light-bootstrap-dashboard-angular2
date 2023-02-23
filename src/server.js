//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname+ 'dist/encuentros-matrimoniales'));

app.get('/*', function(req,res) {
console.log("Fetching from __dirname desde src cam.." + __dirname);     
const fpath = path.join(__dirname+ '/dist/encuentros-matrimoniales/index.html');
console.log("Fetching from.." + fpath);
res.sendFile(fpath);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
