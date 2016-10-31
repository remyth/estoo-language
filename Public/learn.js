document.addEventListener('DOMContentLoaded', function () {     // Wait for Page to load.
    var yourUrl = '/learnword';
    var wordlist = sessionStorage.getItem("wordlist", wordlist);
    if (wordlist == null) {
      wordlist = document.getElementById("Select").value
    } else {
      document.getElementById("Select").value = wordlist;
    };
    //  FUNCTIONS :
    var setAudioClick = function (sw, data) {     // Click event for replaying the test word.
      sw.addEventListener('click', function() {
          data.load();
          data.play();
        });
    };
    var setElementClick = function (data) {     // Click event for selecting the answer boxes.
        data.addEventListener('click', function () {
          location.reload();
        })
    };
    document.getElementById("Select").addEventListener("change", function () {
      wordlist = document.getElementById("Select").value;
      sessionStorage.setItem("wordlist", wordlist);
      location.reload();
    });

    // Build the game table.
    $(function(){
        $.ajax({
            url: yourUrl, //the URL to your node.js server that has data
            dataType: 'json',
            cache: false,
            data: {select: wordlist}
        }).done(function(data){        //"data" will be JSON. Do what you want with it.
            var gameTable = document.getElementById('GameWords');
            // var div = document.createElement('div');
            if (data[0].image) {
              var img = document.createElement('img');
              img.setAttribute('src', data[0].image);
              gameTable.appendChild(img);
            } else {
              var text = document.createTextNode(data[0].English);
              gameTable.appendChild(text);
            }
            setElementClick(gameTable);

            var sw = document.getElementById('Shawnee-Word');
            var swel = document.createElement('input');
            swel.setAttribute('type', 'text');
            swel.setAttribute('id', 'Shawnee');
            swel.setAttribute('disabled', true);
            swel.setAttribute('style', 'width:'+data[0].Shawnee.length*30+'px');
            swel.setAttribute('value', data[0].Shawnee)
            sw.appendChild(swel);

            if (data[0].audio) {
              var audioel = document.createElement('audio');
              audioel.setAttribute('id', 'audioel');
              audioel.setAttribute('src', data[0].audio);
              audioel.setAttribute('preload', 'auto');
              sw.appendChild(audioel);
              var audio = document.getElementById('audioel');
              setAudioClick(sw, audio);
              audio.load();
              audio.play();
            };
        });
    });
});
