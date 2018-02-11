// see https://stackoverflow.com/a/34908037/5855010

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../data/sessions.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

// Call to function with anonymous callback
loadJSON(function(response) {
    data = JSON.parse(response);
    // loop over the data object
    for (var key in data) {
        for (var i = 0; i < data[key].length; i++) {
            var name = data[key][i].name;
            var start = data[key][i].start;
            var end = data[key][i].end;
            var speaker = data[key][i].speaker;
            var type = data[key][i].type;
            var room = data[key][i].room;
            var tags = data[key][i].tags;
            var description = data[key][i].description;
            var session = document.createElement('div');
            session.className = 'session';
            session.innerHTML =
                '<div class="top">' +
                '<div class="time">' + start + ' - ' + end + '</div>' +
                '<div class="room">Room: ' +room + '</div>' +
                '<div class="title">' + '<h4 class="name">' + name + '</h4>' + '</div>' +
                '<h5 class="speaker">' + speaker + '</h5>' +
                '<p class="tags">Audience: ' + type + ' | ' + tags + '</p>' +
                '</div>' +
                '<div class="info">' +
                '<p>' + description + '</p>' +
                '</div>';
            // index.html has this:  <div id="sessions"></div>
            document.getElementById(key).appendChild(session);
           // $(key).html(session);
        }
    }
});







