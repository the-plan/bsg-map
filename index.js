const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');


let port = process.env.PORT || 7070;

let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('public'));

app.get('/raiders', (req, res) => {
  //http://localhost:8080/api/raiders
  fetch(`http://localhost:8080/api/raiders`, {
    method:'GET', headers: {"Content-Type": "application/json"}
  })
  .then(response => {
    return response.json();
  })
  .then(jsonData => {
    res.send({raiders: jsonData});
  })
  .catch(error => {
    res.send({error: error});
  });

  
})

app.listen(port)
console.log("🌍 Discovery Server is started - listening on ", port)
