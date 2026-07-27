const questions = [
  {
    question: "Qual cor da lixeira é usada para papel?",
    options: ["Azul", "Vermelha", "Verde", "Marrom"],
    answer: "Azul"
  },
  {
    question: "Onde devemos descartar restos de comida?",
    options: ["Azul", "Marrom", "Verde", "Amarela"],
    answer: "Marrom"
  },
  {
    question: "Garrafas de vidro vão em qual lixeira?",
    options: ["Verde", "Vermelha", "Azul", "Preta"],
    answer: "Verde"
  },
  {
    question: "Plásticos como garrafas PET devem ir em qual lixeira?",
    options: ["Vermelha", "Azul", "Verde", "Marrom"],
    answer: "Vermelha"
  }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function showQuestion() {
  questionElement.textContent = questions[currentQuestion].question;
  optionsElement.innerHTML = "";
  questions[currentQuestion].options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }
  nextButton.style.display = "block";
}

nextButton.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextButton.style.display = "none";
  } else {
    questionElement.textContent = "Fim do Quiz!";
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas! 🎉`;
  }
};

showQuestion();
function checkAnswer(selected) {
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach(button => {
    if (button.textContent === questions[currentQuestion].answer) {
      button.classList.add("correct");
    }
    if (button.textContent === selected && selected !== questions[currentQuestion].answer) {
      button.classList.add("wrong");
    }
    button.disabled = true;
  });

  if (selected === questions[currentQuestion].answer) {
    score++;
  }
  nextButton.style.display = "block";
}const acertoSom = new Audio("acerto.mp3");
const erroSom = new Audio("erro.mp3");

function checkAnswer(selected) {
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach(button => {
    if (button.textContent === questions[currentQuestion].answer) {
      button.classList.add("correct");
    }
    if (button.textContent === selected && selected !== questions[currentQuestion].answer) {
      button.classList.add("wrong");
    }
    button.disabled = true;
  });

  if (selected === questions[currentQuestion].answer) {
    score++;
    acertoSom.play();
  } else {
    erroSom.play();
  }
  nextButton.style.display = "block";
}
nextButton.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextButton.style.display = "none";
  } else {
    questionElement.textContent = "Fim do Quiz!";
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas! 🎉`;

    // Ranking
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.push(score);
    ranking.sort((a, b) => b - a);
    localStorage.setItem("ranking", JSON.stringify(ranking));

    const rankingDiv = document.createElement("div");
    rankingDiv.innerHTML = "<h3>Ranking de Pontuação</h3>";
    ranking.slice(0, 5).forEach((p, i) => {
      rankingDiv.innerHTML += `<p>${i + 1}º lugar: ${p} pontos</p>`;
    });
    document.getElementById("quiz").appendChild(rankingDiv);
  }
};

