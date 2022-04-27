var express = require("express");
const path = require('path');

const router = express.Router();

var app = express();
var port = 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
var position = new mongoose.Schema({});    
var User = mongoose.model("User", position);


router.post("/addname", (req, res) => {
    console.log('received', req.body);
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


// app.use("/", (req, res) => {
//  res.sendFile(__dirname + "/index.html");
// });





router.get('/static/:file',function(req,res){
file = req.params.file || 'index.html';
console.log('r', file)
res.sendFile(path.join(__dirname, file));
// express.static( __dirname )
});






// router.get('/main.js',function(req,res){
// res.sendFile(path.join(__dirname,'/main.js'));
// __dirname : It will resolve to your project folder.
// });







app.use('/', router);
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html', 'js'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }
  
app.use(express.static('.', options))

app.listen(port, ()=>{
    console.log("Server listening to port"+port)
})