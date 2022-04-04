const buzz = document.querySelector(".character");
const buzzDefault = document.querySelector(".buzzDefault");
let spell = document.querySelector(".spell");
const chat = document.querySelector(".chat");

function walk(value, side) {
  let position = buzz.getBoundingClientRect();
  let buzzMovements = ["buzzAA", "buzzW"];

  let moveBuzz = position.x;
  const moveSide = (moveBuzz += value);
  buzz.style.transition = "all 0.5s";

  if (moveSide <= 0) {
    moveSide != -1;
  } else if (buzzDefault.classList.contains("invisible")) {
    return;
  } else {
    buzz.style.transform = `translateX(${moveSide}px)`;
    buzzDefault.style.transform = `scaleX(${side * -1})`;
    buzz.scroll(value, 0);
    for (let buzzTypes of buzzMovements) {
      let type = document.querySelector(`.${buzzTypes}`);
      type.style.transform = `scaleX(${side})`;
    }
  }
}

function jump(value) {
  const jumpStart = document.querySelector(".buzzJumpStart");
  const buzzJumping = document.querySelector(".buzzJumping");
  const jumpEnd = document.querySelector(".buzzJumpEnd");
  let position = buzz.getBoundingClientRect();
  let x = position.x;
  let v = parseInt(x);
  buzz.style.transition = "all 0.5s";

  if (buzzDefault.classList.contains("invisible")) {
    return;
  } else {
    jumpStart.classList.add("visible");
    buzzDefault.classList.add("invisible");

    let startJump = setInterval(() => {
      buzz.style.transform = `translate(${v}px , -${value}px)`;
      window.clearInterval(startJump);
    }, 400);

    let midJump = setInterval(() => {
      jumpStart.classList.remove("visible");
      buzzJumping.classList.add("visible");
      window.clearInterval(midJump);
    }, 400);

    let endJump = setInterval(() => {
      buzzJumping.classList.remove("visible");
      jumpEnd.classList.add("visible");
      window.clearInterval(endJump);
    }, 1500);

    let jumpDown = setInterval(() => {
      buzz.style.transform = `translate(${v}px , 0)`;
      window.clearInterval(jumpDown);
    }, 1500);

    let endingJump = setInterval(() => {
      jumpEnd.classList.remove("visible");
      buzzDefault.classList.remove("invisible");
      window.clearInterval(endingJump);
    }, 2200);
  }
}

function createItem(element) {
  return document.createElement(element);
}

function renderItem(parent, element) {
  return parent.appendChild(element);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function boltPassive() {
  const buzzW = document.querySelector(".buzzW");
  let spell = document.querySelector(".spell");

  if (buzzDefault.classList.contains("invisible")) {
    return;
  } else {
    buzzW.classList.add("visible");
    buzzDefault.classList.add("invisible");
    spell.classList.add("thunderBlast");

    for (let i = 0; i < randomNumber(30, 50); i++) {
      let img = createItem("img");
      img.src = "images/thunder.png";
      let randomX = randomNumber(-10, 130) - randomNumber(-10, 60);
      let randomY = randomNumber(1, 100) - randomNumber(1, 80);
      let randomR = randomNumber(1, 180) - randomNumber(1, 180);
      let randomRotate = parseInt(randomR);
      let convertX = parseInt(randomX);
      let convertY = parseInt(randomY);
      img.style.transform = `translate(${convertX}px, ${convertY}px) rotate(${randomRotate}deg)`;
      renderItem(spell, img);
    }

    let blastReverse = setInterval(() => {
      spell.classList.add("thunderBlastReverse");
      window.clearInterval(blastReverse);
    }, 1000);

    let spellAction = setInterval(() => {
      buzzDefault.classList.remove("invisible");
      buzzW.classList.remove("visible");
      spell.classList.remove("thunderBlast");
      spell.classList.remove("thunderBlastReverse");
      window.clearInterval(spellAction);
    }, 3800);
  }

  let cleanBolt = setInterval(() => {
    if (!buzzDefault.classList.contains("invisible")) {
      let imgs = document.querySelectorAll(".spell img");
      return imgs.forEach((e) => spell.removeChild(e));
    }
    window.clearInterval(cleanBolt);
  }, 4000);
}

function attack() {
  const buzzAA = document.querySelector(".buzzAA");

  if (buzzDefault.classList.contains("invisible")) {
    return;
  } else {
    buzzAA.classList.add("visible");
    buzzDefault.classList.add("invisible");

    let attackAction = setInterval(() => {
      buzzAA.classList.remove("visible");
      buzzDefault.classList.remove("invisible");
      window.clearInterval(attackAction);
    }, 800);
  }
}

function chatRender() {
  const divMain = document.querySelector(".communication");
  const div = document.querySelector(".chatRender");

  window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      chat.focus();
      divMain.classList.remove("invisible");
      divMain.classList.add("visible");
      let p = createItem("p");
      renderItem(div, p);
      p.innerHTML = chat.value;
      chat.value = "";
      setInterval(() => {
        p.innerHTML = "";
      }, 10000);
    }
  });
}

function buzzKit() {
  window.addEventListener("keydown", function (e) {
    if (e.key == "ArrowRight") {
      walk(50, 1);
    } else if (e.key == "ArrowLeft") {
      walk(-50, -1);
    }
  });

  window.addEventListener("keyup", function (e) {
    if (e.key == "Control") {
      e.preventDefault();
      return attack();
    } else if (e.key == "Alt") {
      e.preventDefault();
      return boltPassive();
    } else if (e.key == "ArrowUp") {
      jump(300);
    }
  });
}

buzzKit();
chatRender();
