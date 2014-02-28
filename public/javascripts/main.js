function init () {
  initTouch();
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

  var arrayLength = phrase.mots.length;
  for (var i = 0; i < arrayLength; i++) {
    for (var name in phrase.mots[i]) {
      html = html + "<div class='case "+ phrase.mots[i][name] +"'><div class='container'></div><div class='mot'>"+name+"</div></div>";
    }
  }
  $("#phrase").html(html);
}

function symbole_drop_down () {
  var html = '';
  var arrayLength = symboles.length;
  for (var i = 0; i < arrayLength; i++) {
    html = html + "<option>" + symboles[i] + "</option>"
  }
  html = "<select>" + symbole_options + "</select>";
  return html;
}

function split_phrase () {
  var texte = $('#saisie').val();

  var html = '';
  var mots = texte.split(' ');
  var arrayLength = mots.length;
  var cur_mot = '';
  var last_mot = '';
  var ponctuation = "!,;:."

  for (var i = 0 ; i < arrayLength; i++) {
    if (mots[i]) {
      cur_mot = mots[i];
      if (ponctuation.indexOf(cur_mot.charAt(0)) === -1 ) {
        if (last_mot) {
          html = html + "<div class='case'><div class='mot'>"+last_mot+"</div>"+symbole_drop_down()+"</div>";
        }
        last_mot = cur_mot;
      } else {
        last_mot = last_mot + ' ' + cur_mot;
      }
    }
  }
  if (last_mot) {
    html = html + "<div class='case'><div class='mot'>"+last_mot+"</div>"+symbole_drop_down()+"</div>";
  }
  $("#phrase").html(html);
}
