const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const startBtn = document.getElementById('start');

let timeLeft = 3;
let score = 0;
let lives = 3;
let correctAnswer = 0;
let timer;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ['+', '-', '×'];
  const op = operations[Math.floor(Math.random() * operations.length)];

  switch(op) {
    case '+':
      correctAnswer = num1 + num2;
      break;
    case '-':
      correctAnswer = num1 - num2;
      break;
    case '×':
      correctAnswer = num1 * num2;
      break;
  }

  questionEl.textContent = `${num1} ${op} ${num2} = ?`;
}

function startTimer() {
  timeLeft = 5;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      loseLife();
    }
  }, 1000);
}

function loseLife() {
  lives--;
  livesEl.textContent = lives;
  if (lives === 0) {
    gameOver();
  } else {
    nextRound();
  }
}

function nextRound() {
  generateQuestion();
  startTimer();
  answerEl.value = '';
  answerEl.focus();
}

function gameOver() {
  questionEl.textContent = `Game Over! 🎉 Your score: ${score}`;
  answerEl.disabled = true;
  startBtn.style.display = 'inline-block';
}

answerEl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    if (parseInt(answerEl.value) === correctAnswer) {
      clearInterval(timer);
      score++;
      scoreEl.textContent = score;
      nextRound();
    }
  }
});

startBtn.addEventListener('click', () => {
  // reset game state
  score = 0;
  lives = 3;
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  answerEl.disabled = false;
  startBtn.style.display = 'none';
  nextRound();
});
