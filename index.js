const express = require('express');
const app = express();

const PORT=3000; 
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res) {
  res.type('text/html');
  res.sendFile(__dirname+'/public/html/index.html');
  
});

app.listen(process.env.port || PORT);