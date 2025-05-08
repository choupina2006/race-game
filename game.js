const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const crashSound = document.getElementById("crash-sound");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

let playerX = 125;
let score = 0;
let timeLeft = 30;
let speed = 5;

// التحكم
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 25;
  } else if (e.key === "ArrowRight" && playerX < 250) {
    playerX += 25;
  }
  player.style.left = playerX + "px";
});

// العد التنازلي
const timer = setInterval(() => {
  timeLeft--;
  timerText.textContent = "الوقت: " + timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    alert("انتهى الوقت! نقاطك: " + score);
    location.reload();
  }
}, 1000);

// بدء العقبة
function startEnemy() {
  let enemyX = Math.floor(Math.random() * 6) * 50;
  let enemyY = -100;
  enemy.style.left = enemyX + "px";

  function move() {
    enemyY += speed;
    enemy.style.top = enemyY + "px";

    if (enemyY > 500) {
      score++;
      scoreText.textContent = "النقاط: " + score;

      // زيادة السرعة كل 5 نقاط
      if (score % 5 === 0) speed += 0.5;

      startEnemy();
    } else if (detectCollision()) {
      crashSound.play();
      alert("اصطدمت! نقاطك: " + score);
      location.reload();
    } else {
      requestAnimationFrame(move);
    }
  }

  move();
}

function detectCollision() {
  const p = player.getBoundingClientRect();
  const e = enemy.getBoundingClientRect();

  return !(
    p.top > e.bottom ||
    p.bottom < e.top ||
    p.left > e.right ||
    p.right < e.left
  );
}

startEnemy();
