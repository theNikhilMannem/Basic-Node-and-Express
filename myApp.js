var express = require('express');
var app = express();
let bodyParser = require('body-parser')

console.log("Hello World")

app.use(bodyParser.urlencoded({extended:false}))

app.use((req, res, next) => {
  console.log("Hey! I'm MWare here.!!")
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})

app.get("/", (req, res) => {
  console.log("Hey, GET!")
  res.sendFile(__dirname + "/views/index.html")
})

app.use(express.static(__dirname+"/public"))

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({"message": "Hello json".toUpperCase()})
  }
  else {
    res.json({"message": "Hello json"})
  }
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({time: req.time})
})

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word})
})

app.route("/name")
.get((req, res) => {
  console.log(req.query)
  res.json({name: req.query.first + " " + req.query.last})
})
.post((req, res) => {
  res.json({name: req.body.first + " " + req.body.last})
})
















 module.exports = app;
