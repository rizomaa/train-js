/* var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
}

var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;    
}

Person.prototype.calculateAge = function() {
    console.log(2016 - this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1949, 'retired');


john.calculateAge();
jane.calculateAge();
mark.calculateAge();


console.log(john);
console.log(jane);
console.log(mark);

*/

//Object.create

/*
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }   
};

var john = Object.create(personProto);
john.name = 'John';
john.job = 'teacher';
john.yearOfBirth = 1990;

var jane = Object.create(personProto, {
    name: {value: 'Jane'},
    job: {value: 'designer'},
    yearOfBirth: {value: 1969}
});
*/

//Primitives vs Objects






//Passing function as an arguments

/*
var years = [1990, 2000, 1987, 2004, 1958];

function arrayCalc(arr, fn) {
    var arrRes = [];
    
    for (var i = 0; i < years.length;  i++) {
        arrRes.push(fn(arr[i]));        
    }
    return arrRes;
}

function isFullAge(el) {  
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <=81) {
        return Math.round(206.9 - (.67 * el));
    } else {
        return -1;
    }
        
}

function calculateAge(el) {
    return 2016 - el;    
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var heartRates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(heartRates);
*/

// Functions returning function

/*
function interviewQuestion(job) {
    
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you explain what UX designer is?');
        } 
    } else if (job === 'teacher') {
        return function(name) {
            console.count(name + ', Who are your pupils?');
        }
    } else {
        return function(name) {
            console.log('Hello' + name + 'What do you do?');
        }
    }
}

// teacherQuestion is anonymous function !!!
var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');

var designerQuestion = interviewQuestion('designer');
designerQuestion('Mark');

interviewQuestion('designer')('Buba');
*/

//Immediately invoked function expressions

/*
function game() {
    var score = Math.random() * 10;
    console.log(score >=5);
}
game();
*/


/*
(function() {
    var score = Math.random() * 10;
    console.log(score >=5);
})();

(function(goodLuck) {
    var score = Math.random() * 10;
    console.log(score >=5 - goodLuck);
})(2);
*/
//console.log(score);


//Closure 

/*
function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a ); 
    }
}

var retirementUS = retirement(66)(1990);
//retirementUS(1990);
var retirementGermany = retirement(65)(1990);
var retirementIceland = retirement(67)(1990);
//retirement(90)(1990);



function interviewQuestion(job) {
    return function(name) {        
        if (job === 'designer') {        
            console.log(name + ', can you explain what UX designer is?');
        } else if (job === 'teacher') {
            console.count(name + ', Who are your pupils?');        
        } else {        
            console.log('Hello' + name + 'What do you do?');
        }
    }
}

// teacherQuestion is anonymous question !!!
var teacherQuestion = interviewQuestion('teacher')('John');
//teacherQuestion('John');

var designerQuestion = interviewQuestion('teacher')('Mark');
//designerQuestion('Mark');
interviewQuestion('designer')('Buba');

*/



// Bind, Call, Apply methods

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and Gentlemen! I am ' + this.name + '. I\'m a ' + this.job + ' and ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! '+ this.name + ' What is up? I\'m a ' + this.job + ' and ' + this.age + ' old. Have a nice ' + timeOfDay); 
        }
    }
}
var emily = {
    name: 'Emily',
    age: 30,
    job: 'designer'
}


//john.presentation('formal', 'morning');
//john.presentation('friendly', 'afternoon'); 

//john.presentation.call(emily, 'formal', 'afternoon'); 

//work with array
//john.presentation.apply(emily, 'formal', 'afternoon'); 


var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('afternoon');
johnFriendly('morning');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('night');


//develope bind method

var years = [1990, 2000, 1998, 2004, 1958];

function arrayCalc(arr, fn) {
    var arrRes = [];
    
    for (var i = 0; i < years.length;  i++) {
        arrRes.push(fn(arr[i]));        
    }
    return arrRes;
}

function isFullAge(limit, el) {  
    return el >= limit;
}

function calculateAge(el) {
    return 2016 - el;    
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);