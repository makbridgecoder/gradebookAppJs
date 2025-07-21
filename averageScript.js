

let score = [];



function getAverageScore(scores) {
  let counter = 0;
  let arraySum = 0;
  while(counter < scores.length) {
    scores[counter];
    arraySum = arraySum + scores[counter];
    counter = counter + 1;
    
  }
  
  let averageScore = arraySum / scores.length;
  return averageScore;

}


console.log(getAverageScore([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverageScore([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));


function getGrade(score) {



}