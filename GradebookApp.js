const body = document.querySelector('body');
const scoreAdd = document.querySelector(".score-add-form");
const subjectDropdown = document.querySelector("#subject_dropdown"); 
const classInput = document.querySelector("#class_number_entry");
const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const assessmentDropdown = document.querySelector("#assessments_dropdown");
const switchBtn = document.getElementById('bgr_switch_btn');








//function to count average score

let scores = [];
function getAverageScore(scores) {
  let sumScores = 0;
  for(const scoresCounter of scores) {
    
    sumScores = sumScores + scoresCounter;
    
  }
  return sumScores / scores.length;
  
}

console.log(getAverageScore([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverageScore([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));
console.log(getAverageScore([2,3,45,6,2,2]));

//function to check validation of score

function isValidScore(score) {
  return typeof score === "number" && score >= 0 && score <= 100;
}

console.log(isValidScore(2));
console.log(isValidScore(25));
console.log(isValidScore(60));
console.log(isValidScore(99));
console.log(isValidScore(101));
console.log(isValidScore(""));
console.log(isValidScore(undefined));
console.log(isValidScore(NaN));
console.log(isValidScore(200));
console.log("\n");



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


console.log(getGrade(100));
console.log(getGrade(200));
console.log(getGrade(97));
console.log(getGrade(86));
console.log(getGrade(35));
console.log(getGrade(""));


//function to check if student has a passing check

function hasPassingGrade(score) {
  if(!isValidScore(score)) return "Invalid score";
  if (getGrade(score) !== "F") return true;
  else return false;
}

console.log(hasPassingGrade(999));
console.log(hasPassingGrade(100));
console.log(hasPassingGrade(20));
console.log(hasPassingGrade(56));
console.log(hasPassingGrade(60));
 
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

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 60));
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 100));
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 999));

const backgroundColorsArr = [
  "#D6A99D",
  "#FBF3D5",
  "#8AA624", 
  "#DEE8CE"
];

 
function getRandomIndex() {
  let randomNumber = Math.floor((backgroundColorsArr.length * Math.random()));
  console.log(randomNumber);
  return randomNumber;
} 


function switchBtnAction() {
  const color = backgroundColorsArr[getRandomIndex()];
  console.log(color);
  body.style.backgroundColor = color;
}

switchBtn.addEventListener("click", switchBtnAction);

