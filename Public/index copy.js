document.addEventListener('DOMContentLoaded', function () {
var yourUrl = '/getjson';
var testWord = [];

var gameMessage = function (msg, color, dur, callback) {
  var alt = document.createElement('div');
      alt.setAttribute("style","position:absolute;text-align:center;font-size:4em;height:100px;width:100%;margin:auto;top:0;bottom:0;left:0;right:0;background-color:"+color+";");
      alt.innerHTML = msg;
      setTimeout(function(){
      alt.parentNode.removeChild(alt);
    },dur);
      document.body.appendChild(alt);
      return callback;
};

var checkInput = function (input) {
    if (input === testWord.English) {
      gameMessage('Wesa!!! :-)', 'green', 800, function (){
      });
    } else {
      gameMessage('Mata. :-(', 'red', 800);
    };
    setTimeout(function () {
      location.reload();
    }, 800);
};

var setClickEvent = function (data) {
  // console.log(i);
  for (var x=0;x<data.length;x++){
    document.getElementById('word-'+x).addEventListener('click', function() {
      console.log(data.length);
      var elData = data[x].English;
      checkInput(elData);
    });
  };
};
var setAudioClick = function (sw, data) {
    sw.addEventListener('click', function() {
      data.play();
    });
};

$(function(){
    $.ajax({
        url: yourUrl, //the URL to your node.js server that has data
        dataType: 'json',
        cache: false
    }).done(function(data){        //"data" will be JSON. Do what you want with it.
        var gameTable = document.getElementById('GameWords');
        var table = document.createElement('table');
        var tr = [];
        var td = [];
        var img = [];

        for (var x=1; x<3; x++) {
          tr[x] = document.createElement('tr');
          for (var i=0; i<4; ++i) {
            if (i < 2) {
              td[i] = document.createElement('td');
              td[i].setAttribute('id', 'word-'+i);
              td[i].addEventListener('click', function () {
                var elData = data[i].English;
                checkInput(elData);
              });
              img[i] = document.createElement('img');
              img[i].setAttribute('src', 'images/bread.jpg');
              img[i].setAttribute('style', 'display:block');
              td[i].appendChild(img[i]);
              var text = [];
              text[i] = document.createTextNode(data[i].English);
              td[i].appendChild(text[i]);
            } else if (i >= 2 && i<4) {
              td[i] = document.createElement('td');
              td[i].setAttribute('id', 'word-'+i);
              td[i].addEventListener('click', function () {
                var elData = data[i].English;
                checkInput(elData);
              });
              img[i] = document.createElement('img');
              img[i].setAttribute('src', 'images/bread.jpg');
              img[i].setAttribute('style', 'display:block');
              td[i].appendChild(img[i]);
              var text = [];
              text[i] = document.createTextNode(data[i].English);
              td[i].appendChild(text[i]);

            }else {
              console.log('Something went wrong!');
            }
            tr[x].appendChild(td[i]);
            table.appendChild(tr[x]);

          }

        };

        // var tr1 = document.createElement('tr');
        // var tr2 = document.createElement('tr');


        // var td1 = document.createElement('td');
        // td1.setAttribute('id', 'word-0');
        // td1.addEventListener('click', function () {
        //   var elData = data[0].English;
        //   checkInput(elData);
        // });
        // var img1 = document.createElement('img');
        // img1.setAttribute('src', 'images/bread.jpg');
        // img1.setAttribute('style', 'display:block');
        // td1.appendChild(img1);
        // var td2 = document.createElement('td');
        // td2.setAttribute('id', 'word-1');
        // td2.addEventListener('click', function () {
        //   var elData = data[1].English;
        //   checkInput(elData);
        // });
        // var img2 = document.createElement('img');
        // img2.setAttribute('src', 'images/butter.jpg');
        // img2.setAttribute('style', 'display:block');
        // td2.appendChild(img2);
        // var td3 = document.createElement('td');
        // td3.setAttribute('id', 'word-2');
        // td3.addEventListener('click', function () {
        //   var elData = data[2].English;
        //   checkInput(elData);
        // });
        // var img3 = document.createElement('img');
        // img3.setAttribute('src', 'images/bowl.jpg');
        // img3.setAttribute('style', 'display:block');
        // td3.appendChild(img3);
        // var td4 = document.createElement('td');
        // td4.setAttribute('id', 'word-3');
        // td4.addEventListener('click', function () {
        //   var elData = data[3].English;
        //   checkInput(elData);
        // });
        // var img4 = document.createElement('img');
        // img4.setAttribute('src', 'images/beef.jpg');
        // img4.setAttribute('style', 'display:block');
        // td4.appendChild(img4);
        //
        //
        // var text3 = document.createTextNode(data[2].English);
        // var text4 = document.createTextNode(data[3].English);
        //
        //
        // td3.appendChild(text3);
        // td4.appendChild(text4);
        //
        // tr[1].appendChild(td2);
        // tr[2].appendChild(td3);
        // tr[2].appendChild(td4);
        //
        //
        // table.appendChild(tr[1]);
        // table.appendChild(tr[2]);
        gameTable.appendChild(table);
        // setClickEvent(data)

        // for (i=0;i<data.length;i++){
        //   var div = document.getElementById('GameWords');
        //   var el = document.createElement('input');
        //   el.setAttribute('type', 'button');
        //   el.setAttribute('id', `word-${i}`);
        //   el.setAttribute('value', data[i].English);
        //   div.appendChild(el);
        //   setClickEvent(i, data[i]);
        //   console.log(data[i].English);
        //   console.log(data[i].Shawnee);
        // };
        var count=Math.floor(Math.random()*data.length);
        testWord = data[count];

        var sw = document.getElementById('Shawnee-Word');
        var swel = document.createElement('input');
        swel.setAttribute('type', 'text');
        swel.setAttribute('id', 'Shawnee');
        swel.setAttribute('disabled', true);
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
