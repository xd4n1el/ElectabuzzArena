const buzz = document.querySelector(".character");
const buzzDefault = document.querySelector(".buzzDefault");
const chat = document.querySelector(".chat");
const status = document.querySelector(".buzzStatus");
const mana = document.querySelector(".buzzMana");
let spell = document.querySelector(".spell");
let manaPoints = 100;

function walk(value, side) {
  let position = buzz.getBoundingClientRect();
  let moveBuzz = position.x;
  const moveSide = (moveBuzz += value);
  buzz.style.transition = "all 0.5s";
  let buzzMovements = ["buzzAA", "buzzW"];

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

function manaStatus() {
  const power = document.querySelector(".character > div");

  let manaRegen = setInterval(() => {
    if (manaPoints < 100) {
      return mana.style.width = `${manaPoints += 10}%`;
    } else {
      window.clearInterval(manaRegen);
    }
  }, 20000);

  if (power) {
    mana.style.width = `${manaPoints -= 30}%`;
  }
  
}

function cheats() {
  if(chat.value == "manafull" ) {
    return mana.style.width = `${manaPoints = 100}%`;
  }
}

function boltPassive() {
  const buzzW = document.querySelector(".buzzW");
  const manaPercentage = mana.getBoundingClientRect();
  let manaLeft = manaPercentage.width;

  if (buzzDefault.classList.contains("invisible") || manaPoints < 30) {
    return;
  } else {
    let div = createItem("div");
    renderItem(buzz, div);
    buzzW.classList.add("visible");
    buzzDefault.classList.add("invisible");
    const spell = document.querySelector(".character div");
    spell.classList.add("spell");
    spell.classList.add("thunderBlast");
    manaStatus();

    for (let i = 0; i < randomNumber(30, 50); i++) {
      let img = createItem("img");
      img.src = "images/thunder.png";
      let randomX = randomNumber(-10, 130) - randomNumber(-10, 60);
      let randomY = randomNumber(1, 100) - randomNumber(1, 80);
      let randomR = randomNumber(1, 180) - randomNumber(1, 180);
      img.style.transform = `translate(${parseInt(randomX)}px, ${parseInt(
        randomY
      )}px) rotate(${parseInt(randomR)}deg)`;
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
    const power = document.querySelector(".character > div");

    if (power) {
      power.remove();
      Array.from(power).forEach((e) => spell.removeChild(e));
      window.clearInterval(cleanBolt);
    }
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
      divMain.classList.remove("invisible");
      divMain.classList.add("visible");
      let p = createItem("p");
      renderItem(div, p);

      if (e.key == "Enter") {
        p.innerHTML = chat.value;
        cheats()
        chat.value = "";
      }

      setInterval(() => {
        p.innerHTML = "";
      }, 10000);
    }

    return chat.focus();
  });

  chat.addEventListener("blur", () => {
    let p = document.querySelector(".chatRender p");

    setInterval(() => {
      if (p.innerHTML == "") {
        divMain.classList.remove("visible");
        divMain.classList.add("invisible");
      } else {
        return;
      }
    }, 5000);
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
