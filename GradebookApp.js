const body = document.querySelector('body');
const scoreAdd = document.querySelector(".score-add-form");
const subjectDropdown = document.querySelector("#subject_dropdown"); 
const classInput = document.querySelector("#class_number_entry");
const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const assessmentDropdown = document.querySelector("#assessments_dropdown");
const switchBtn = document.getElementById('bgr_switch_btn');

const backgroundColorsArr = [
  "#D6A99D",
  "#FBF3D5",
  "#8AA624", 
  "#DEE8CE"
];

//function to count average score

let scores = [];
function getAverageScore(scores) {
  let sumScores = 0;
  for(const scoresCounter of scores) {
    
    sumScores = sumScores + scoresCounter;
    
  }
  return sumScores / scores.length;
  
}

//function to check validation of score

function isValidScore(score) {
  return typeof score === "number" && score >= 0 && score <= 100;
}

//function to convert score to letter grade

function getGrade(score) {
  if (!isValidScore(score)) return "Invalid number";
    if (score == 100) return "A++";
    if (score >=90) return "A";
    if (score >=80) return "B";
    if (score >=70) return "C";
    if (score >=60) return "D";
    return "F";
};

//function to check if student has a passing check

function hasPassingGrade(score) {
  if(!isValidScore(score)) return "Invalid score";
  if (getGrade(score) !== "F") return true;
  else return false;
}

//function to return a message 

function studentMsg(totalScores, studentScore) {
  
  const average = getAverageScore(totalScores); 
  const grade = getGrade(studentScore);
  const passed = hasPassingGrade(studentScore);
  
  const  baseMessage = `Class average: ${average}. Your grade: ${grade}.`
  
  if (!isValidScore(studentScore)) return "Invalid student score."
  if(hasPassingGrade(studentScore)) return baseMessage + " You passed the course."
  else return baseMessage + " You failed the course."
  
  
}


function getRandomIndex() {
  let randomNumber = Math.floor((backgroundColorsArr.length * Math.random()));
  console.log(randomNumber);
  return randomNumber;
} 

function switchBtnAction() {
  const color = backgroundColorsArr[getRandomIndex()];
  body.style.backgroundColor = color;
}

switchBtn.addEventListener("click", switchBtnAction);

