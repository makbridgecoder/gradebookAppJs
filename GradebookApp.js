const body = document.querySelector("body");
const scoreAddForm = document.querySelector(".score-add-form");
const subjectDropdown = document.querySelector("#subject_dropdown"); 
const classInput = document.querySelector("#class_number_entry");
const nameInput = document.querySelector("#name-input");
const surnameInput = document.querySelector("#surname-input");
const assessmentDropdown = document.getElementById("assessments_dropdown");
const switchBtn = document.getElementById("bgr_switch_btn");
const nameInputAlert = document.getElementById("name-input-alert");
const surnameInputAlert = document.getElementById("surname-input-alert");
const addScoreBtn = document.getElementById("add-score-btn");
const scoreInput = document.getElementById("score-input");
const scoreComment = document.getElementById("score-comment"); 
const entriesCounter = document.getElementById("gradebook-counter_id"); 
const entriesList = document.getElementById("entriesList");
const entriesEmpty = document.getElementById("entriesEmpty");

let scoreIsValid = false;

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
  if (input.value === '') {
    nameAndSurnameInputAlert.style.display = "block";
    nameAndSurnameInputAlert.textContent = "This field cannot be empty";
    input.style.borderColor = "red";
    return false;
    
  } else if (!nameRegex.test(input.value)) {
    nameAndSurnameInputAlert.style.display = "block";
    nameAndSurnameInputAlert.textContent = "Input must start with a capital letter and be 2-15 characters long";
    input.style.borderColor = "red";
    return false;
    
  } else {
    input.style.borderColor = "green";
    nameAndSurnameInputAlert.style.display = "none";
    return true;
  }
  
}; 


//function to check validation of score

function isValidScore(score) {
  
  if (score === "") {
    scoreComment.innerHTML = "This field cannot be empty";
    scoreComment.style.display = "block"
    scoreInput.style.borderColor = "red";
    return false;
  } 
  
  score = Number(score);
  
  if (isNaN(score)) {
    scoreComment.innerHTML = "Score must be a number";
    scoreComment.style.display = "block";
    scoreInput.style.borderColor = "red";
    console.log("Must be a number")
    return false;
    
  } 
  
  if (score >= 0 && score <= 100) {
    scoreComment.style.display = "none";
    scoreInput.style.borderColor = "green";
    scoreIsValid = true;
    return true ;
    
    
  } else {
    scoreComment.innerHTML = "Score must be between 0 and 100";
    scoreComment.style.display = "block";
    scoreInput.style.borderColor = "red";
    console.log("Invalid score");
    return false;
  }
};
/* TO DO
- add function that create a random id to each record to check if there is no doubled, exacly the same record, make an alert of that
- alert or push up before message sending to accept the record
- how to indicate that input's have a valid value? maybe some ok?
- get student data from DB or check if it is in the DB
- use grid to adjust entrycontainer
- refactor code using data-* attributes


*/


let entries = []; //array with entries
console.log(entries);

function updateCounter() {
entriesCounter.innerText = String(entries.length);
}

function toggleEmptyState() {
  if (!entriesEmpty) return;
  entriesEmpty.style.display = entries.length === 0 ? "block" : "none";
}

function renderEntries() {
  entriesList.innerHTML = ""; 

  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "entry";
    li.dataset.id = entry.id; 


    li.innerHTML = `
    <div class="entry__main">
      <span class="entry__name">${index + 1}. ${entry.name} ${entry.surname}</span>
      <span class="entry__score">${entry.score}</span>
      <span class="entry__grade">${entry.grade}</span>
      <button type="button" class="entry__delete" data-action="delete">Delete</button>
    </div>
    <div class="entry__meta">
      <span>Class: ${entry.className}</span>
      <span>Subject: ${entry.subject}</span>
      <span>Assessment: ${entry.assessmentType}</span>
    </div>
    `;

    entriesList.appendChild(li);



  });

  toggleEmptyState();
  updateCounter();

}

function createEntry() {
  const score = Number(scoreInput.value); 

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: nameInput.value.trim(),
    surname: surnameInput.value.trim(),
    className: classInput.value,
    subject: subjectDropdown.value, 
    assessmentType: assessmentDropdown.value, 
    score, 
    grade: getGrade(score),
  };

}


function addEntry() {
  const entry = createEntry();
  entries.push(entry);
  renderEntries();
}

entriesList.addEventListener("click", (e) => {
   const btn = e.target.closest('button[data-action="delete"]');
   if (!btn) return;

   const li = btn.closest(".entry");
   if (!li) return; 

   const id = li.dataset.id;

    entries = entries.filter((entry) => entry.id !== id);
    renderEntries();
   

})

scoreAddForm.addEventListener('submit', (e) => { 
  e.preventDefault();
  const scoreValue = scoreInput.value;
  const isScoreValid = isValidScore(scoreValue);
  const isNameValid = nameAndsurnameValidation(e, nameInput, nameInputAlert); 
  const isSurnameValid = nameAndsurnameValidation(e, surnameInput, surnameInputAlert); 
  if (!isNameValid || !isSurnameValid || !isScoreValid) {
      console.log("validation failed");
      return;
    } 
    addEntry();
    scoreAddForm.reset();
    nameInput.style.borderColor = "";
    surnameInput.style.borderColor = "";
    scoreInput.style.borderColor = "";


  
});

  
//function to convert score to letter grade
function getGrade(score) {

    if (score == 100) return "A++";
    if (score >=90) return "A";
    if (score >=80) return "B";
    if (score >=70) return "C";
    if (score >=60) return "D";
    return "F";
    
};


/*

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