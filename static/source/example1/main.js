$(document).ready(function(){
//  var map = [
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
//        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

  var map = [
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]];

  function format(map){
    var html = "";
    for(var i in map){
        html += "<tr>"
        for(var j in map[i]){

            if(map[i][j] === -1){ // 路径
                html += "<td class='map-node' style='background-color:red;'>&nbsp;</td>"
            }else if(map[i][j] === 1){ // 墙
                html += "<td class='map-node' style='background-color:blue;'>&nbsp;</td>"
            }else{
                html += "<td class='map-node'>&nbsp;</td>"
            }
        }
        html += "</tr>"
    }
    return html;
  }

  $('#map').html(format(map));

  $('#queryBtn').click(function(){
        var req = {
            "type": "a*",
            "start": "0,0",
            "goal": "10,13",
            "map":map
        };

        $.ajax({
            url: "/find/path",
            type: "post",
            processData: false,
            data: JSON.stringify(req),
            headers: {'Content-Type': 'application/json'},
            success: function (res) {
                $('#map').html(format(res['data']));
            }
        });
    });
});