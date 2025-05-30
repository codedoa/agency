const allClickableKeys = "wasdjkl";
const homeUrlo = "../../index.html"
// const homeUrlo = "https://codedoa.github.io/agency-site/#footer";       // production
// const homeUrlo = "http://127.0.0.1:3000/projects/bootstrap/#footer"; // localhost

$(".homebutton").on("click", function() {
  setTimeout(window.location.href = homeUrlo, 1500);
});

$(".drum").on("click", function() {
  buzzBuzz(this.textContent);
  wiggleWiggle(this.textContent);
});

$("body").on("keydown", function(event) {
// next lines is a check if key pressed belongs to our mapped keys to avoid exceptions in the console log
  if(allClickableKeys.includes(event.key)) {
    buzzBuzz(event.key);
    wiggleWiggle(event.key);
  }
});

function buzzBuzz(key) {
  switch (key) {
    case "w": 
      var audio = new Audio('./sounds/tom-1.mp3');
    break;
    case "a": 
      var audio = new Audio('./sounds/tom-2.mp3');
    break; 
    case "s": 
      var audio = new Audio('./sounds/tom-3.mp3');
    break; 
    case "d": 
      var audio = new Audio('./sounds/tom-4.mp3');
    break; 
    case "j": 
      var audio = new Audio('./sounds/snare.mp3');
    break; 
    case "k": 
      var audio = new Audio('./sounds/kick-bass.mp3');
    break; 
    case "l": 
      var audio = new Audio('./sounds/crash.mp3');
    break; 
  }
  audio.play();
};

function wiggleWiggle (keyKa) {
  $("."+keyKa).addClass("pressed");
  setTimeout(function() {
    $("."+keyKa).removeClass("pressed");
  }, 150);
}