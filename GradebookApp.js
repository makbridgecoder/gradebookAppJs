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


//Name & Surname validation 
const nameRegex = /^[A-Z][a-z]{2,15}$/;
  

function validateName(e) {
  e.preventDefault();
  const nameValue = nameInput.value;
  const surnameValue = surnameInput.value;
  let isValid = true;

  if (nameValue === "" ) {
    nameInputAlert.style.display = "inline";
    nameInputAlert.textContent = "This field cannot be empty";  
    console.log("empty");
  } else if (!nameRegex.test(nameValue)) {
    nameInput.style.borderColor = "red";
    nameInputAlert.style.display = "inline";
    nameInputAlert.textContent = "Name must start with a capital letter and be 3-15 characters long";
    console.log("invalid");
    isValid = false;
  } else {
    nameInputAlert.style.display = "none";
    nameInput.style.borderColor = "green";
    console.log("valid");
    return isValid;
  }
  
}



scoreAdd.addEventListener("submit", validateName);


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

console.log(getGrade());

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

console.log(studentMsg());

