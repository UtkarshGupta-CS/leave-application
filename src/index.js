const express = require("express");
const bodyParser = require("body-parser");

let app = new express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.listen(port, () => console.log("Listening on port:" + port));
