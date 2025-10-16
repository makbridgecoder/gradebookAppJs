const body = document.querySelector("body");
const scoreAdd = document.querySelector(".score-add-form");
const subjectDropdown = document.querySelector("#subject_dropdown"); 
const classInput = document.querySelector("#class_number_entry");
const nameInput = document.querySelector("#name-input");
const surnameInput = document.querySelector("#surname-input");
const assessmentDropdown = document.querySelector("#assessments_dropdown");
const switchBtn = document.getElementById("bgr_switch_btn");
const nameInputAlert = document.getElementById("name-input-alert");
const surnameInputAlert = document.getElementById("surname-input-alert");
const addScoreBtn = document.getElementById("add-score-btn");
const scoreInput = document.getElementById("score-input");
const scoreComment = document.getElementById("score-comment"); 



const backgroundColorsArr = [
  "#D6A99D",
  "#FBF3D5",
  "#8AA624", 
  "#DEE8CE"
];

//Changes page background color

function getRandomIndex() {
  let randomNumber = Math.floor((backgroundColorsArr.length * Math.random()));
  return randomNumber;
} 

function switchBtnAction() {
  const color = backgroundColorsArr[getRandomIndex()];
  body.style.backgroundColor = color;
}

switchBtn.addEventListener("click", switchBtnAction);

//function to count average score

let scores = [];
function getAverageScore(scores) {
  let sumScores = 0;
  for(const scoresCounter of scores) {
    
    sumScores = sumScores + scoresCounter;
    
  }
  return sumScores / scores.length;
  
}

//Name validation 
const nameRegex = /^[A-Z][a-z]{1,14}$/;
 
//function to check name and surname validation

function nameAndsurnameValidation(e, input, nameAndSurnameInputAlert) {
  e.preventDefault();

  if (input.value === '') {
    nameAndSurnameInputAlert.style.display = "inline";
    nameAndSurnameInputAlert.textContent = "This field cannot be empty";
    input.style.borderColor = "red";
    
  } else if (!nameRegex.test(input.value)) {
    nameAndSurnameInputAlert.style.display = "inline";
    nameAndSurnameInputAlert.textContent = "Input must start with a capital letter and be 2-15 characters long";
    input.style.borderColor = "red";

  } else {
    input.style.borderColor = "green";
    nameAndSurnameInputAlert.style.display = "none";
  }

}; 

scoreAdd.addEventListener("submit", (e) => {
  nameAndsurnameValidation(e, nameInput, nameInputAlert); 
  nameAndsurnameValidation(e, surnameInput, surnameInputAlert); 
  //place for next function
});
//! finish this function / validation
//function to check validation of score

function isValidScore(score) {

  if (score === "") {
    console.log("empty score");
    scoreComment.innerHTML = "This field cannot be empty";
    scoreComment.style.display = "inline"
    scoreInput.style.borderColor = "red";
    return false;
  } 
  
  score = Number(score);

  if (isNaN(score)) {
    scoreComment.innerHTML = "Score must be a number";
    scoreComment.style.display = "inline";
    scoreInput.style.borderColor = "red";
    console.log("Must be a number")
    return false;
  } 
  
  if (score >= 0 && score <= 100) {
    console.log("Valid score");
    scoreComment.style.display = "none";
    scoreInput.style.borderColor = "green";
    return true;
    
  } else {
    scoreComment.innerHTML = "Score must be between 0 and 100";
    scoreComment.style.display = "inline";
    scoreInput.style.borderColor = "red";
    console.log("Invalid score");
    return false;
  }
};

addScoreBtn.addEventListener('click', () => { 
  const scoreValue = scoreInput.value;
  isValidScore(scoreValue);
  console.log("click is ok")
});

//function to convert score to letter grade
/*
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




addScoreBtn.addEventListener("click", hasPassingGrade)

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

console.log(studentMsg());

*/