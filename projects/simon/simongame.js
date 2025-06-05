const buttonColors = ["red","blue","green","yellow"];
const homeUrlo = "../../index.html";
var gamePattern = [];
var clickedPattern = [];
var currentLevel=0;
var muted=true;

$(document).ready(function() {
  initializeMutedState();
});

function initializeMutedState() {
  if (typeof sessionStorage.getItem('sessionmuted') !== 'undefined' && sessionStorage.getItem('sessionmuted') === 'no') {
    muted = false;
    $(".mutetoggle").attr("class", "navbutton mutetoggle");
  } else {
    muted = true;
    $('.mutetoggle').attr("class","navbutton mutetoggle muted");
  }
}

$(".home").on("click", function() {
  setTimeout(window.location.href = homeUrlo, 500);
});

$(".info").on("click", function () {
  $("#modalWindow").addClass("modal-visible");
});
$("#closeModal").on("click", function () {
  $("#modalWindow").removeClass("modal-visible");
});
/*
$(window).on("click", function(event) {
  if (event.target === $("#modalWindow")) { 
    $("#modalWindow").removeClass("modal-visible"); 
  }
});
*/

$(".mutetoggle").on("click", function () {
  muted = !muted;
  if(muted) {
    $(".mutetoggle").attr("class","navbutton mutetoggle muted");
    sessionStorage.setItem('sessionmuted', 'yes');
  } else {
    $(".mutetoggle").attr("class","navbutton mutetoggle");
    sessionStorage.setItem('sessionmuted', 'no');
  }
});

// This is the original hard restart with full page reload.
$("#restart").on("click", function(event) {
  event.preventDefault();
  location.reload();
});

$(".btn").each(function() {
  $(this).on("click", function() {
    iClick($(this).attr("id"));
  })
});

$("#start").on("click", function () {
  $(this).addClass("btnhdn");
  $("#restart").removeClass("btnhdn");
  $(".btn").removeClass("btnhdn");
  $(".container").removeClass("startgame");
  if(gamePattern.length === 0) {
    nextSequence();
  }
});

$(".startgame").on("click", function() {
  $("#start").click();
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random()*4);
  livenButton(buttonColors[randomNumber]);
  gamePattern.push(buttonColors[randomNumber]);
  currentLevel++;
  $("#level-title").text("Level " + currentLevel);
}

function iClick(currentColor) {
  livenButton(currentColor);
  clickedPattern.push(currentColor);
  checkAnswer(clickedPattern.length);
}

function livenButton(color) {
  $("#"+color).addClass("pressed");
  setTimeout(function() {
    $("#"+color).removeClass("pressed");
  }, 250);
  switch (color) {
    case "green": 
     var audio = new Audio('./sounds/green.mp3');
    break;
    case "red": 
     var audio = new Audio('./sounds/red.mp3');
    break; 
    case "yellow": 
     var audio = new Audio('./sounds/yellow.mp3');
    break; 
    case "blue": 
      var audio = new Audio('./sounds/blue.mp3');
    break; 
    default:
      return;
  }
  if(!muted) { 
    audio.play(); 
  }
}

function checkAnswer(currentLevel) {
  for(var i=0; i < currentLevel; i++) {
    if(gamePattern[i] !== clickedPattern[i]) {
      setTimeout(function () {
        endGame();
        $(".btn").addClass("btnhdn");
      },100);
      return false;
    }
  }
  if(clickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      $(".container").addClass("goodgame");
      $(".btn").addClass("btnhdn");
    },200);
    clickedPattern = [];
    setTimeout(function() {
      $(".container").removeClass("goodgame");
      $(".btn").removeClass("btnhdn");
      nextSequence()
    },600);
  }
}

function endGame() {
  var audio = new Audio('./sounds/wrong.mp3');
  if(!muted) { 
    audio.play(); 
  }
  $("#level-title").text("Ooupsey... Level " + currentLevel + " was a bit too crunchy! Better Luck next time!");
  $(".container").addClass("endgame");
  $("body").addClass("game-over");
  $("#restart").text("try again");
  $(".container")[0].scrollIntoView(false);
  $(".endgame").on("click", function() {
    $("#restart").click();
  })
}
