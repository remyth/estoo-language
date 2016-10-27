document.addEventListener('DOMContentLoaded', function () {     // Wait for Page to load.
    var yourUrl = '/getjson';
    var testWord = [];
    var score = sessionStorage.getItem("score", score);
    if (score == null) {
      score = 0;
      sessionStorage.setItem('score', score);
    };
    console.log(score);
    var wordlist = sessionStorage.getItem("wordlist", wordlist);
    if (wordlist == null) {
      wordlist = document.getElementById("Select").value
    } else {
      document.getElementById("Select").value = wordlist;
    };
    document.getElementById('ScoreBoard').innerHTML = score;

    //  FUNCTIONS :
    var gameMessage = function (msg, color, dur, callback) {     //Dixplay message on screen.
      var alt = document.createElement('div');
          alt.setAttribute("style","position:absolute;text-align:center;font-size:8em;height:200px;width:50%;margin:auto;top:0;bottom:0;left:0;right:0;background-color:"+color+";");
          alt.innerHTML = msg;
          setTimeout(function(){
          alt.parentNode.removeChild(alt);
        },dur);
          document.body.appendChild(alt);
          return callback;
    };
    var checkInput = function (input) {     //Check to see if the selected box matches the test question.
        if (input === testWord.English) {
          gameMessage('Wesa!!! :-)', 'green', 800, function (){
          });
          ++score;
          sessionStorage.setItem('score', score);
        } else {
          gameMessage('Mata. :-(', 'red', 800);
          --score;
          sessionStorage.setItem('score', score);
        };
        setTimeout(function () {
          location.reload();
        }, 800);
    };
    var setAudioClick = function (sw, data) {     // Click event for replaying the test word.
        sw.addEventListener('click', function() {
          data.play();
        });
    };
    var setElementClick = function (data) {     // Click event for selecting the answer boxes.
      console.log(data);
      var elData = data.English;
      checkInput(elData);
    };
    document.getElementById("Select").addEventListener("change", function () {
      wordlist = document.getElementById("Select").value;
      sessionStorage.setItem("wordlist", wordlist);
      location.reload();
    });
$article = $('#article').val();
    // Build the game table.
    $(function(){
        $.ajax({
            url: yourUrl, //the URL to your node.js server that has data
            dataType: 'json',
            cache: false,
            data: {select: wordlist}
        }).done(function(data){        //"data" will be JSON. Do what you want with it.
            var gameTable = document.getElementById('GameWords');
            var table = document.createElement('table');
            var tr = [];
            var i = 0;
            for (var x=1; x<3; x++) {
              tr[x] = document.createElement('tr');
              for (var d = 0; d < 2; ++d) {
                var td = [];
                td[d] = document.createElement('td');
                td[d].setAttribute('id', 'word-' + i);
                td[d].addEventListener('click', setElementClick.bind(null, data[i]), false);
                if (data[i].image) {
                  var img = [];
                  img[d] = document.createElement('img');
                  img[d].setAttribute('src', data[i].image);
                  td[d].appendChild(img[d]);
                } else {
                var text = [];
                  text[d] = document.createTextNode(data[i].English);
                  td[d].appendChild(text[d]);
              };
              tr[x].appendChild(td[d]);
              i += 1;
              };
              table.appendChild(tr[x]);
            };
            gameTable.appendChild(table);
            var count=Math.floor(Math.random()*data.length);
            testWord = data[count];

            var sw = document.getElementById('Shawnee-Word');
            var swel = document.createElement('input');
            swel.setAttribute('type', 'text');
            swel.setAttribute('id', 'Shawnee');
            swel.setAttribute('disabled', true);
            swel.setAttribute('style', 'width:'+testWord.Shawnee.length*20+'px');
            swel.setAttribute('value', testWord.Shawnee)
            sw.appendChild(swel);

            if (testWord.audio) {
              var audioel = document.createElement('audio');
              audioel.setAttribute('id', 'audioel');
              audioel.setAttribute('src', testWord.audio);
              audioel.setAttribute('preload', 'auto');
              sw.appendChild(audioel);
              var audio = document.getElementById('audioel');
              setAudioClick(sw, audio);
              audio.play();
            };
        });
    });
});
