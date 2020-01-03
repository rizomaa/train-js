
var MarkWeight = 71;
var JohnWeight = 80;

var MarkHeight = 1.8;
var JohnHeight = 1.75;

var JohnBMI = JohnWeight / (JohnHeight * JohnHeight);
var MarkBMI = MarkWeight / (MarkHeight * MarkHeight);

console.log("John\'s BMI " + JohnBMI);
console.log("Mark\'s BMI " + MarkBMI);

var JohnBMIHigher = JohnBMI > MarkBMI;
var MarkBMIHigher = MarkBMI > JohnBMI;


// Ternary operator
 MarkBMIHigher ? console.log("Is Mark\'s BMI higher than John\'s? " + MarkBMIHigher):
  console.log("Is John\'s BMI higher than Mark\'s? " + JohnBMIHigher);


  var firstName = 'Mark';
  var job = 'tutor';

// Switch statement
  switch (job) {
    case 'teacher':
    case 'tutor':
      console.log(firstName + "has a classes today.");
      break;
    case 'driver':
    case 'desiner':
    defaut:
      console.log(firstName + "does something.");
      break;
  }


var height = '';

// Falsy and truthy value
if (height || height === 0) {
  console.log('Variable is defined');
} else {
  console.log('Variable is undefined');
}

// Comparinson


var JohnTeamScore = [89, 120, 103];
var NikeTeamScore = [116, 194, 123];
var MaryTeamScore = [97, 134, 105];

var JohnTeamScoreSum = (JohnTeamScore[0] + JohnTeamScore[1] + JohnTeamScore[2])/3;
var NikeTeamScoreSum = (NikeTeamScore[0] + NikeTeamScore[1] + NikeTeamScore[2])/3;
var MaryTeamScoreSum = (MaryTeamScore[0] + MaryTeamScore[1] + MaryTeamScore[2])/3;

console.log(JohnTeamScoreSum, NikeTeamScoreSum, MaryTeamScoreSum);
/*
if (JohnTeamScoreSum > NikeTeamScoreSum) {
  console.log('John\' team won the game. The John\'s result is ' + JohnTeamScoreSum);
} else if (JohnTeamScoreSum < NikeTeamScoreSum) {
  console.log('Nike\' team won the game. The Nike\'s result is ' + NikeTeamScoreSum);
} else {
  console.log('The equal result');
}
*/
switch (true) {
  case (JohnTeamScoreSum > NikeTeamScoreSum) && (JohnTeamScoreSum > MaryTeamScoreSum):
    console.log('John\' team won the game. The John\'s result is ' + JohnTeamScoreSum);
    break;
  case JohnTeamScoreSum < NikeTeamScoreSum && MaryTeamScoreSum < NikeTeamScoreSum:
    console.log('Nike\' team won the game. The Nike\'s result is ' + NikeTeamScoreSum);
    break;
  case JohnTeamScoreSum < MaryTeamScoreSum && NikeTeamScoreSum < MaryTeamScoreSum:
    console.log('Mary\'s team won the game. The Mary\'s result is ' + MaryTeamScoreSum);
    break;
  default:
    console.log('Another result');
}

// Functions
function calculateAge(dateBirth) {
  return 2020 - dateBirth;
}

var ageJohn = calculateAge(1990);
var ageMike = calculateAge(1980);
var ageMary = calculateAge(1970);
console.log(ageJohn, ageMike, ageMary);



function calculateAgeRetirement(year, FirstName) {
  var age = calculateAge(year);
  var retirement = 65 - age;
  if (retirement < 0) {
    console.log(FirstName + " has already retired.");
  } else {
    console.log(FirstName + ' retires in ' + retirement + " years");
  }
}

calculateAgeRetirement(2000, 'Peter');
calculateAgeRetirement(1900, 'Vika');
calculateAgeRetirement(1990, 'Siarhei');

// Function statement and function expressions ->

// Function statement/declaration function WhatDoYouDo(job, firstName) {  }

//function expression
var WhatDoYouDo = function(job, firstName) {
  switch (job) {
    case 'teacher':
      return firstName + ' teaches kids.';
    case 'driver':
      return firstName + ' drives a cab in Lisbon.';
    case 'designer':
      return firstName + 'paint beautiful pictures.'
    default:
      return firstName + 'does something else.'
  }
}
console.log(WhatDoYouDo('driver', 'Jame'));
console.log(WhatDoYouDo('designer', 'Jame'));
console.log(WhatDoYouDo('teacher', 'Jame'));



var TipsMap = {
  bills: [124, 48, 268],
  tips: [0, 0, 0],
  fullinvoices: [0, 0, 0],
};

function calculateTip(TipsMap) {

  var tipper;

  switch (true) {
    case TipsMap.bills[i] < 50:
      tipper = 0.2;
      break;
    case (TipsMap.bills[i] >= 50) && (TipsMap.bills[i] <=200) :
      tipper = 0.15;
      break;
    case TipsMap.bills[i] > 200:
      tipper = 0.1;
      break;
  }
  TipsMap.tips[i] = Math.round(tipper * TipsMap.bills[i]);
  TipsMap.fullinvoices[i] = TipsMap.tips[i] + TipsMap.bills[i];
  return TipsMap;
}

var i;

for (i=0; i<TipsMap.bills.length; i++) {
  calculateTip(TipsMap);
}

console.log(TipsMap);

//-------------------------------------------


var John  = {
  FullName: "John",
  Weight: 80,
  Height: 1.75,
  BMI: function() {
    return this.BMIresult = Math.round(this.Weight / (this.Height * this.Height));
  }
}
var Mark = {
  FullName: "Mark",
  Weight: 70,
  Height: 1.8,
  BMI: function() {
    return this.BMIresult = Math.round(this.Weight / (this.Height * this.Height));
  }
}

Mark.BMI();
John.BMI();
//console.log(John.FullName + "\'s BMI " + John.BMIresult);
//console.log(Mark.FullName + "\'s BMI " + Mark.BMIresult);

if (Mark.BMI() < John.BMI()) {
  console.log(John.FullName + "\'s BMI " + John.BMIresult);
} else if (Mark.BMIresult > John.BMIresult) {
  console.log(Mark.FullName + "\'s BMI " + Mark.BMIresult);
} else {
  console.log('The result is equal ' + John.BMIresult + ' =  ' + Mark.BMIresult);
}



// loops and iterations - homework




var TipsMapJohn = {
  bills: [124, 48, 268, 180, 42],
  fullinvoices: [],
  tips: [],
  calculateTipM: function () {

    var tipper;

    for (i=0; i<this.bills.length; i++) {
      switch (true) {
        case this.bills[i] < 50:
          tipper = 0.2;
          break;
        case (this.bills[i] >= 50) && (this.bills[i] <=200) :
          tipper = 0.15;
          break;
        case this.bills[i] > 200:
          tipper = 0.1;
          break;
      }
      this.tips[i] = Math.round(tipper * this.bills[i]);
      this.fullinvoices[i] = this.tips[i] + this.bills[i];
    }
    return true;
  }
};

console.log(TipsMapJohn.calculateTipM());


var TipsMapMark = {
  bills: [77, 375, 110, 45],
  fullinvoices: [],
  tips: []
};

function calculateTipMark(MarkF) {

  var tipper;

  for (i = 0; i < MarkF.bills.length; i++) {
    switch (true) {
      case MarkF.bills[i] < 100:
        tipper = 0.2;
        break;
      case (MarkF.bills[i] >= 100) && (MarkF.bills[i] <=300) :
        tipper = 0.1;
        break;
      case MarkF.bills[i] > 300:
        tipper = 0.25;
        break;
    }
    MarkF.tips[i] = Math.round(tipper * MarkF.bills[i]);
    MarkF.fullinvoices[i] = MarkF.tips[i] + MarkF.bills[i];
  }
  return Mark;
}

calculateTipMark(TipsMapMark);
console.log(TipsMapMark);

function AvarageCalc(Family) {
  var sum = 0;
  for (i = 0; i < Family.bills.length; i++) {
      sum = sum + Family.bills[i];
  }
  var ava = sum/i;
  return ava;
}

TipsMapMark.avaTip = AvarageCalc(TipsMapMark);
TipsMapJohn.avaTip = AvarageCalc(TipsMapJohn);
console.log(TipsMapMark);
console.log(TipsMapJohn);

if (TipsMapMark.avaTip > TipsMapJohn.avaTip) {
  console.log('Mark\'s family pay tips more than John\'s ');
} else {
  console.log('John\'s family pay tips more than Mark\'s ');
}
