var stations = {
    "Uppsala": [59.86, 17.64],
    "Umeå": [63.8, 20.26],
    "Stockholm": [59.33, 18.06],
    "Lund": [55.7, 13.12],
    "Kiruna": [67.967, 20.309],
}

function main(data1, data2) {
    var $ = document.querySelector.bind(document)

    var html = ""

    for (var stat in stations) {
        html += "<option value=" + stat + ">" + stat + "</option>"
    }
    html = "Compare <select id=stat1>" + html + "</select> and <select id=stat2>" + html + "</select>"
    html += "<button id=compare>Compare!</button>"
    html = "<p>" + html + "</p>"

    if (data1 && data2) {
        data1 = data1.timeSeries
        data2 = data2.timeSeries
        var temp1 = []
        var time1 = []
        for (var i = 0; i < data1.length; i++) {
            for (var j = 0; j < data1[i].parameters.length; j++) {
                if (data1[i].parameters[j].name == "t") {
                    time1.push(data1[i].validTime.slice(0, 16).replace('T', ', '))
                    temp1.push(data1[i].parameters[j].values[0])
                }
            }
        }
        var temp2 = []
        var time2 = []
        for (var i = 0; i < data2.length; i++) {
            for (var j = 0; j < data2[i].parameters.length; j++) {
                if (data2[i].parameters[j].name == "t") {
                    time2.push(data2[i].validTime.slice(0, 16).replace('T', ', '))
                    temp2.push(data2[i].parameters[j].values[0])
                }
            }
        }

        var table = ""
        for (var i = 0; i < temp1.length; i++) {

            var box1 = "<div style='width:" + (temp1[i] + 20) / 60 * 100 + "%; height: 10px; position: relative; background: purple;'>"
            var box2 = "<div style='width:" + (temp2[i] + 20) / 60 * 100 + "%; height: 10px; position: relative; background: blue;'>"

            box1 += "<div style='position: absolute; left: 100%; bottom: 0; font-size: 11px'>" + temp1[i]
            box2 += "<div style='position: absolute; left: 100%; bottom: 0; font-size: 11px'>" + temp2[i]

            table += "<tr><td rowspan=2>" + time1[i] + "</td><td>" + box1 + "</td></tr>"
            table += "<tr><td style='width: 10cm'>" + box2 + "</td></tr>"
        }
        table = "<table>" + table + "</table>"

        html += table

    }

    $("#main").innerHTML = html
    $("#stat2").value = "Umeå"

    $("#stat1").onchange = onchange
    $("#stat2").onchange = onchange

    var stat1 = stations[$("#stat1").value]
    var stat2 = stations[$("#stat2").value]

    function onchange() {

        var request = new XMLHttpRequest();
        request.open("GET", "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + stat1[1] + "/lat/" + stat1[0] + "/data.json", true);

        request.onload = function() {
            if (request.status == 200) {
                // Success!
                var data1 = JSON.parse(request.responseText);
                request = new XMLHttpRequest();
                request.open("GET", "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" + stat2[1] + "/lat/" + stat2[0] + "/data.json", true);

                request.onload = function() {
                    if (request.status == 200) {
                        var data2 = JSON.parse(request.responseText);
                        main(data1, data2)
                    } else {
                        $("#main").innerHTML += 'error!'
                    }
                };

                request.onerror = function() {
                    $("#main").innerHTML += 'error!'
                };

                request.send();
            } else {
                $("#main").innerHTML += 'error!'
            }
        };

        request.onerror = function() {
            $("#main").innerHTML += 'error!'
        };

        request.send();

    }
}
main()