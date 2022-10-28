let express = require('express');
let app = express();

// lesson 1: Meet the Node console
console.log("Hello World");

// lesson 2: Start a Working Express Server
app.get('/root',(req,res) =>{
  res.send('Hello Express');
})

// lesson 3: Serve an HTML File
app.get('/',(req,res) =>{
  res.sendFile(__dirname + '/views/index.html');
})

// lesson 4: Serve Static Assets
app.use('/public',express.static(__dirname + '/public'));

// lesson 5: Serve JSON on a Specific Route
app.get("/json",(req, res) => {
res.json({"message": "Hello json"})
});

// lesson 6: Use the .env File
// NOTE: Because Replit can't create file .env on path main, so you click icon lock(Secrets) on the left screen. Fill in KEY and VALUE
// KEY: MESSAGE_STYLE
// VALUE: uppercase
app.get("/json",(req, res) => {
  const mySecret = process.env['MESSAGE_STYLE'];
  if (mySecret === 'uppercase') {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
}
});

// lesson 7: Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
});

// lesson 8: Chain Middleware to Create a Time Server
app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next();
},(req, res) =>{
  res.json({"time": req.time})
});

// lesson 9: Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) =>{
  res.json({echo: req.params.word})
});

// lesson 10: Get Query Parameter Input from the Client
app.get('/name',(req, res) =>{
  var firstname = req.query.first;
  var lastname = req.query.last;
  res.json({name: `${firstname} ${lastname}`})
});

// lesson 11: Use body-parser to Parse POST Requests
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// lesson 12: Get Data from POST Requests
app.post('/name', (req, res) => {
  let name = req.body.first + ' ' + req.body.last;
  res.json({name: name});
});

 module.exports = app;
