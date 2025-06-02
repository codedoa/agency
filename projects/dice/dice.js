const homeUrlo = "../../index.html";

function gameOneRound() {
  let randomNumber1 = Math.floor(Math.random()*6)+1;
  let randomNumber2 = Math.floor(Math.random()*6)+1;
  let iSimg1 = document.querySelector(".img1");
  let iSimg2 = document.querySelector(".img2");
  let hpath = document.querySelector("h1");

  iSimg1.setAttribute("src","./images/dice"+randomNumber1+".png");
  iSimg2.setAttribute("src","./images/dice"+randomNumber2+".png");

  if(randomNumber1>randomNumber2) {
    hpath.textContent="🏴‍☠️ Player1 Wins!";
  } else if (randomNumber2>randomNumber1) {
    hpath.textContent="Player2 Wins! 🏴‍☠️";
  } else {
    hpath.textContent="🫥 It's a Draw! 🫥";
  }
}

document.getElementById("homebutton").addEventListener("click", function() {
  setTimeout(window.location.href = homeUrlo, 500);
});