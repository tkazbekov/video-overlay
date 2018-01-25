const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const formidable = require('formidable');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.post('/banner', function(req, res) {
  var form = formidable.IncomingForm();

  form.parse(req);
  
  console.log(form.parse(req))
  form.on('fileBegin', function(name, file) {
    file.path = __dirname + '/uploads/' + file.name;
  });

  form.on('file', function(name, file) {
    console.log('Uploaded' + file.name);    
  });

  res.sendFile(__dirname + 'index.html');
})

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '80';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server running on port:${port}`));