$(document).ready(function(){

  var map = [];
  var is_select_start = false;
  var is_select_goal = false;
  var is_select_wall = false;
  var start = null;
  var goal = null;
  var wall_start = null;
  var wall_end = null;

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

  $('#generateBtn').click(function(){
    var rows = $('#rows').val();
    var cols = $('#cols').val();

    for(var i=0; i<rows; i++ ){
        var _map = Array();
        for(var j=0; j<cols; j++){
            _map[j] = 0;
        }
        map[i] = _map;
    }

    $('#map').html(format(map));
  });

  $('#selectStart').click(function(){
    is_select_start = true;
    $('td').css('cursor','pointer');
    is_select_wall = false;
  });

  $('#selectGoal').click(function(){
    is_select_goal = true;
    $('td').css('cursor','pointer');
    is_select_wall = false;
  });

  $('#selectWall').click(function(){
    is_select_wall = true;
    $('td').css('cursor','pointer');
  });

  // 点击选择起点或者终点
  $('#map').bind("click","td",function(event){
    var target = $(event.target);
    if(target.prop("nodeName")=="TD"){
        if(is_select_start){
            start = target.index()+","+target.parent().index();
            target.css("background-color","red");
            is_select_start = false;
            $('td').css('cursor','Default');
            $('#start_text').html("("+start+")");
        }
        if(is_select_goal){
            goal = target.index()+","+target.parent().index();
            target.css("background-color","yellow");
            is_select_goal = false;
            $('td').css('cursor','Default');
            $('#goal_text').html("("+goal+")");
        }
    }
  });

  $('#map').bind("mousedown","td",function(event){
    var target = $(event.target);
    if(target.prop("nodeName")=="TD"){
      if(is_select_wall){
          wall_start = [target.parent().index(), target.index()];
      }
    }
  });

  $('#map').bind("mouseup","td",function(event){
  var target = $(event.target);
    if(target.prop("nodeName")=="TD"){
      if(is_select_wall){
          wall_end = [target.parent().index(), target.index()];

          if(wall_start[0] === wall_end[0] ){
            for(var i=wall_start[1]; i<=wall_end[1]; i++){
                map[wall_start[0]][i] = 1;
            }
            $('#map').html(format(map));
          }

          if(wall_start[1] === wall_end[1]){
            for(var i=wall_start[0]; i<=wall_end[0]; i++){
                map[i][wall_start[1]] = 1;
            }
            $('#map').html(format(map));
          }
      }
    }
  });

  $('#queryBtn').click(function(){
        var req = {
            "type": "a*",
            "start": start,
            "goal": goal,
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