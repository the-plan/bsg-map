const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');


let port = process.env.PORT || 7070;

let app = express();
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: false}))

//app.use(express.static('public'));

let users = ["🐼", "🐻", "🐰", "🦁"]

app.get('/users/:id', (req, res) => {
  let user = users[parseInt(req.params.id)]
  res.send(user)
});

app.listen(port)
console.log("🌍 Discovery Server is started - listening on ", port)
