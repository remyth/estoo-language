var express = require("express");
var app = express();
var parser = require("body-parser");
var multer = require("multer");
var json = require("./Public/language.json");
var fs = require("fs");

var port = '80';
var upload = multer({ dest: './Public/media/'}).fields([{name: 'getAudio', maxCount: 1}, {name: 'getImage', maxCount: 1}]);

var getWords = (count, json) => {
  var fullList = fs.readFileSync('./Public/' + json + '.json');
  var gameWords = [];
  var fullListParse = JSON.parse(fullList);
  var fullListCount = fullListParse.length;
  var arr = []
  while(arr.length < count){
    var randomnumber=Math.floor(Math.random()*fullListCount)
    var found=false;
    for(var i=0;i<arr.length;i++){
  	if(arr[i]==randomnumber){found=true;break}
    }
    if(!found)arr[arr.length]=randomnumber;
  };
  for (var i = 0; i < arr.length; i++) {
    var arrt = arr[i];
    gameWords.push(fullListParse[arrt]);
  };
  var exportWords = JSON.stringify(gameWords, null, 4);
  return exportWords;
};
var appendJSON = (obj, jsonType) => {
  var configFile = fs.readFileSync('./Public/' + jsonType + '.json');
  var config = JSON.parse(configFile);
  config.push(obj);
  var configJSON = JSON.stringify(config, null, 4);
  fs.writeFileSync('./Public/' + jsonType + '.json', configJSON);
  var getWords = require('./Public/' + jsonType + '.json');
};
app.enable('trust proxy');
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
// app.use()
app.use(function(req, res, next) {
  var clientIP = req.ip.split(':').pop();
    console.log(clientIP);
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.use(express.static("./Public"));

app.post('/add-words', function(req, res) {
  upload(req, res, function(err) {
  var jsonType = req.body.formselect;
  var English = req.body.English;
  var Shawnee = req.body.Shawnee;
  var audio = '';
  var image = '';
  if (req.files['getAudio']) {
    audio = 'media\\' + req.files['getAudio'][0].filename;
  }
  if (req.files['getImage']) {
    image = 'media\\' + req.files['getImage'][0].filename;
  }
  var words = {
        English: English,
        Shawnee: Shawnee,
        audio: audio,
        image: image
  };
  appendJSON(words, jsonType);
});
  res.redirect('back');
});
app.get('/getjson', function(req, res) {
  var gameWords = getWords(4, req.query.select);
  res.send(gameWords);
});
app.get('/learnword', function(req, res) {
  var gameWords = getWords(1, req.query.select);
  res.send(gameWords);
});
app.listen(port);
console.log(`Express app running on port ${port}`);
module.exports = app;
