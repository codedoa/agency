const buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var clickedPattern = [];
var currentLevel=0;
 const homeUrlo = "../../index.html";
// const homeUrlo = "https://codedoa.github.io/agency-site/#footer";      // production
// const homeUrlo = "http://127.0.0.1:3000/index.html#footer";   // localhost

$(".homebutton").on("click", function() {
  setTimeout(window.location.href = homeUrlo, 500);
});

$("#restart").on("click", function(event) {
  event.preventDefault();
  location.reload();
});

function endGame() {
  var audio = new Audio('./sounds/wrong.mp3');
  audio.play();
  $("#level-title").text("Ooupsey... Level " + (--currentLevel) + " was a bit too crunchy! Better Luck next time!");
  $(".container").addClass("endgame");
  $("body").addClass("game-over");
  $(".endgame").on("click", function() {
    $("#restart").click();
  })
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random()*4);
  livenButton(buttonColors[randomNumber]);
  gamePattern.push(buttonColors[randomNumber]);
  currentLevel++;
  $("#level-title").text("Level " + currentLevel);
  return;
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
  audio.play();
}
  
function iClick(currentColor) {
  livenButton(currentColor);
  clickedPattern.push(currentColor);
  checkAnswer(clickedPattern.length);
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
  if(clickedPattern.length === gamePattern.length) {
    nextSequence();
  }
});

$(".startgame").on("click", function() {
  $("#start").click();
})