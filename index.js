const express = require('express');
const app = express();

const PORT=3000; 
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res) {
  res.type('text/html');
  res.sendFile(__dirname+'/public/html/index.html');
  
});

app.get('/sacas2',function(req,res) {
  res.type('text/html');
  res.sendFile(__dirname+'/public/html/indexSacas2.html');
  
});

app.get('/fabrica',function(req,res) {
  res.type('text/html');
  res.sendFile(__dirname+'/public/html/indexFabrica.html');
  
});

app.get('/distribuidora',function(req,res) {
  res.type('text/html');
  res.sendFile(__dirname+'/public/html/indexDistribuidora.html');
  
});

app.get('/maps',function(req,res) {
  res.type('text/html');
  res.sendFile(__dirname+'/public/html/indexMapsCerto.html');
  
});

app.get('/graph',function(req,res) {
  res.type('text/html');
  res.sendFile(__dirname+'/public/html/graph.html');
  
});

app.get('/smartcontract',function(req,res) {
  res.type('text/html');
  res.sendFile(__dirname+'/public/html/indexSmart.html');
  
});

app.get('/admin',function(req,res) {
  res.type('text/html');
  res.sendFile(__dirname+'/public/html/indexAdmin.html');
  
});

app.listen(process.env.port || PORT);