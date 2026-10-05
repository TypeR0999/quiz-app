// クイズデータ（answer は choices の中の正解の位置。0 から数える）
const quizzes = [
  {
    question: "日本で一番高い山はどれでしょう？",
    choices: ["北岳", "富士山", "槍ヶ岳", "奥穂高岳"],
    answer: 1,
  },
  {
    question: "うるう年ではない年の1年は何日でしょう？",
    choices: ["360日", "364日", "365日", "366日"],
    answer: 2,
  },
  {
    question: "太陽系の惑星のうち、一番大きいのはどれでしょう？",
    choices: ["土星", "地球", "海王星", "木星"],
    answer: 3,
  },
  {
    question: "1気圧のもとで、水が沸騰する温度はおよそ何℃でしょう？",
    choices: ["100℃", "80℃", "120℃", "150℃"],
    answer: 0,
  },
  {
    question: "信号機の「止まれ」を表す色は何色でしょう？",
    choices: ["青", "黄", "赤", "白"],
    answer: 2,
  },
  {
    question: "日本の都道府県はいくつあるでしょう？",
    choices: ["43", "45", "47", "49"],
    answer: 2,
  },
  {
    question: "光の三原色に含まれない色はどれでしょう？",
    choices: ["赤", "黄", "緑", "青"],
    answer: 1,
  },
  {
    question: "1時間は何秒でしょう？",
    choices: ["600秒", "1800秒", "6000秒", "3600秒"],
    answer: 3,
  },
];

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreEl = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

let currentIndex = 0;
let score = 0;

// 現在の問題を画面に表示する
function showQuestion() {
  const quiz = quizzes[currentIndex];

  progressEl.textContent = `第${currentIndex + 1}問 / 全${quizzes.length}問`;
  questionEl.textContent = quiz.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextButton.hidden = true;
  choicesEl.innerHTML = "";

  quiz.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(index));
    choicesEl.appendChild(button);
  });
}

// 選んだ答えを判定し、フィードバックを表示する
function checkAnswer(selectedIndex) {
  const quiz = quizzes[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-button");

  // 一度答えたら選び直せないようにする
  buttons.forEach((button) => {
    button.disabled = true;
  });
  buttons[quiz.answer].classList.add("correct");

  if (selectedIndex === quiz.answer) {
    score++;
    feedbackEl.textContent = "⭕ 正解！";
    feedbackEl.classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("wrong");
    feedbackEl.textContent = `❌ 不正解… 正解は「${quiz.choices[quiz.answer]}」です。`;
    feedbackEl.classList.add("wrong");
  }

  const isLast = currentIndex === quizzes.length - 1;
  nextButton.textContent = isLast ? "結果を見る" : "次の問題へ";
  nextButton.hidden = false;
}

// 合計スコアを表示する
function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  scoreEl.textContent = `${quizzes.length}問中${score}問正解`;
}

nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizzes.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
});

showQuestion();
