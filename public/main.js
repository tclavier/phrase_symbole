function init () {
  create();
  $('.symbol').draggable({
    helper: "clone",
    revert: isGoodPlace
  });
  $('.container').droppable({
    hoverClass: 'hovered',
    tolerance: "pointer",
    drop: changeBackground
  });
}

function changeBackground (event, ui) {
  var droppable_classes = $(this).parent().get( 0 ).className.split(/\s+/);
  var symbol = ui.draggable.attr('id');
  if ($(this).parent().hasClass(symbol)) { 
    $(this).addClass ('bravo-'+symbol);
    return true;
  } else {
    return false;
  }
}
  
function isGoodPlace(droppable) {
  if(droppable === false) {
    return true;
  } else {
    var symbol = $(this).attr('id');
    var droppable_classes = droppable.parent().get( 0 ).className;
    if (droppable.parent().hasClass(symbol)) {
      return false;
    } else {
      return true;
    }
  }
}

function create () {
  var html = '';
  for (var name in phrase) {
    html = html + "<div class='case "+ phrase[name] +"'><div class='container'></div><div class='mot'>"+name+"</div></div>";
  }
  $("#phrase").html(html);
}

