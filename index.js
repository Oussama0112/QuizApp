// grabbing my document element
let infoContainer = document.querySelector(".infoContainer"),
  name = document.querySelector(".name span"),
  numberOfQuestion = document.querySelector(".numberOfQuestion span"),
  mainGameContainer = document.querySelector(".mainGameContainer"),
  question = document.querySelector(".question"),
  myQCM = document.querySelector(".QCM"),
  submitBtn = document.querySelector(".submit"),
  display = document.querySelector(".display"),
  bullets = document.querySelector(".bullets"),
  countDownTimer = document.querySelector(".countDownTimer"),
  result = document.querySelector(".result"),
  resultGrade = document.querySelector(".result span");

// -------------my variabels--------------
let qIndex = 0;
let points = 0;
let countdownInterval;
// --------------------------------------------------------
// --------------------mainCode---------------------------------
// --------------------------------------------------------------
fetch("questions.json")
  .then((data) => data.json())
  .then((data) => {
    let myQuestionNumber = data.length;
    numberOfQuestion.innerHTML = myQuestionNumber;
    question.innerText = data[qIndex]["title"];
    let i = 4;
    QuestionDesign(data, i);
    bulletsDesign(myQuestionNumber);
    countdown(8, myQuestionNumber);

    submitBtn.addEventListener("click", function (e) {
      scoreCalc();

      qIndex++;

      if (qIndex < myQuestionNumber) {
        clearInterval(countdownInterval);
        countdown(8, myQuestionNumber);
        document.querySelectorAll(".wraper").forEach((ele) => ele.remove());
        document.querySelectorAll(".bullets span").forEach((ele) => ele.remove());
        question.innerText = data[qIndex]["title"];
        QuestionDesign(data, i);
        bulletsDesign(myQuestionNumber);
      } else {
        yourResult(points, myQuestionNumber);
      }
    });
  });

//   -------------------declaring my function------------------
function QuestionDesign(arr, limit) {
  for (let index = 1; index <= limit; index++) {
    let wraper = document.createElement("div");
    wraper.classList.add("wraper");
    let myInput = document.createElement("input");
    myInput.type = "radio";
    myInput.id = `answer_${index}`;
    myInput.name = "question";
    myInput.dataset.right = arr[qIndex]["right_answer"];
    if (index === 1) {
      myInput.setAttribute("checked", "");
    }
    let myLabel = document.createElement("label");
    myLabel.htmlFor = `answer_${index}`;
    myLabel.innerText = arr[qIndex][`answer_${index}`];
    wraper.appendChild(myInput);
    wraper.appendChild(myLabel);
    myQCM.appendChild(wraper);
  }
}
function bulletsDesign(qN) {
  for (let i = 0; i < qN; i++) {
    let span = document.createElement("span");
    if (i === qIndex) {
      span.classList.add("active");
    }
    bullets.appendChild(span);
  }
}
function scoreCalc() {
  let allInput = document.querySelectorAll("[name ='question']");
  allInput.forEach((ele) => {
    if (ele.checked) {
      if (ele.nextElementSibling.innerText == ele.dataset.right) {
        ++points;
        console.log(points);
      }
    }
  });
}
function yourResult(p, q) {
  mainGameContainer.remove();
  result.style.display = "block";
  p < q / 4
    ? (resultGrade.innerText = "bad")
    : p > q / 4 && p < q / 3
    ? (resultGrade.innerText = "good")
    : p > q / 3 && p < q / 2
    ? (resultGrade.innerText = "very good")
    : (resultGrade.innerText = "perfect");
  p < q / 4
    ? resultGrade.classList.add("bad")
    : p > q / 4 && p < q / 3
    ? resultGrade.classList.add("good")
    : p > q / 3 && p < q / 2
    ? resultGrade.classList.add("veryGood")
    : resultGrade.classList.add("perfect");
}
function countdown(duration, count) {
  countdownInterval = setInterval(function () {
    let minutes = parseInt(duration / 60);
    let seconds = parseInt(duration % 60);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    countDownTimer.innerText = `${minutes}:${seconds}`;

    if (--duration < 0) {
      clearInterval(countdownInterval);
      submitBtn.click();
    }
  }, 1000);
}
