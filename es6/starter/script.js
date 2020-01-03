//let i = 45;

for (let i = 0; i < 5; i++) {
    console.log(i);
}



{
    let s = 0 ;
    const f = "Nameeee";
   // var c = 345;
    console.log(s);
}



(function() {
    var c = 345;
})();

//console.log(c);

// Strings 


let firstName = 'John';
let lastName = 'Marley';
const yearofBirth = 1990;

function calAge(year) {
    return 2016 - yearofBirth;
}

// ES5
console.log('This is ' + firstName + 'and ' + lastName + '. Today, he has ' + calAge(yearofBirth));

// ES6 
console.log(`This is ${firstName} and ${lastName}. Today. He is ${calAge(yearofBirth)}`);

const n = `JFirst name is ${firstName}`;

console.log(n.endsWith('hwwn'));
console.log(n.startsWith('hwwn'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5));



const years = [1982, 1967, 2000];

//ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
})

console.log(ages5);

//ES6
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index+1} is ${2016 - el}`); 
console.log(ages6);


ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index+1} is ${age}`;
}); 

console.log(ages6);

// Arrow function

var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        
        var self = this;
        
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is a ' + self.color + ' button in position ' + self.position;
            //console.log(str);
            alert(str);
        });
    }
}

//box5.clickMe();

// ES6 

// Arrow function

const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is a ' + this.color + ' button in position ' + this.position;
            //console.log(str);
            alert(str);
        });
    }
}

//box6.clickMe();

// EX6 - 2 
/*
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is a ' + this.color + ' button in position ' + this.position;
            //console.log(str);
            alert(str);
        });
    }
}

box66.clickMe();

*/


/*function Person(name) {
    this.name = name;
}

Person.prototype.myfriends5 = function(friends) {
    
    var arr = friends.map(function(el) {
        return this.name + ' is friend with ' + el;
    }.bind(this));
    
    console.log(arr);    
}

var friends = ['Bob', 'Mike', 'Peter'];

new Person('John').myfriends5(friends);
*/

//ES6 version


function Person(name) {
    this.name = name;
}

Person.prototype.myfriends5 = function(friends) {
    
    let arr = friends.map(el => `${this.name} + is friend4 with ' + ${el}`);    
    console.log(arr);    
}

const friends = ['Bob', 'Mike', 'Peter'];

new Person('Emily').myfriends5(friends);

//Descructuring

//ES5

var john = ['John', 26];

var name = john[0];
var age = john[1];

//ES6

const [name1, year1] = ['John', 26];

console.log(name1 + ', ' + year1);


const obj = {
    firstName2: 'John',
    lastName2: 'Smith1'
};

const {firstName2, lastName2} = obj;

console.log(firstName2 + ', ' + lastName2);



//return several values

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    
    return [age, 65 - age]; 
    
}
const [age3, retirement] = calcAgeRetirement(2000);

console.log(age3, retirement);

//Loops and arrays


const boxes = document.querySelectorAll('.box');

//ES5 


boxesArr5 = Array.prototype.slice.call(boxes);

boxesArr5.forEach(function(cur) {
   cur.style.backgroundColor = 'dodgerblue';
});

//ES6 

//const boxesArr6 = Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

const boxesArr6 = Array.from(boxes);//.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

//ES5 way
/*
for (var i = 0; i < boxesArr5.length; i++) {
    
    if (boxesArr5[i].className === 'box blue') {
        continue;
    }
    boxesArr5[i].textContent = 'I was changed to blue';
    
}
*/

//ES6

for (const cur of boxesArr6) {
    if (cur.className.includes('blue') === 'box blue') {
        continue;
    }
    cur.textContent = 'I was changed to a blue color!!!';
}


var ages = [12, 10, 15, 18, 11];

var full = ages.map(function(cur) {
    return cur >= 18;
});

console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

//ES6
console.log(ages.findIndex(cur => cur >= 18));

console.log(ages.find(cur => cur >= 18));


function addFourAges(a, b, c, d) {
    return a + b + c + d;
}
//ES5 
var ages = [1967, 1980, 2004, 1991];

var sum2 = addFourAges.apply(null, ages);
console.log(sum2);
const sum3 = addFourAges(...ages);
console.log(sum3);

const familyJohn = ['John', 'Emily'];
const familyBob = ['Bob', 'James'];

const bigFamily = [...familyJohn, 'Mimi', ...familyBob];

console.log(bigFamily);

const  button = document.querySelector('h1');
const boxes4 = document.querySelectorAll('.box');
const all = [button, ...boxes4];

//Array.from(all).forEach(cur => cur.style.color = 'red');

console.log(all);


// Rest parameters
/*
function isFullAge5() {
    
    var ArgsArr = Array.prototype.slice.call(arguments);
        
    ArgsArr.forEach(function(cur) {
        console.log(2016 - cur >= 18);
        //return (2016 - cur);
    });
    
    //console.log(ArgsArr);
}

//isFullAge5(1999, 1995, 2002, 1985);

//ES6

function isFullAge6(...years) {
    years.forEach(cur => console.log(2016 - cur >= 18) ;
}

isFullAge6(1999, 1995, 2002, 1985);
*/
/*
function isFullAge5(limit) {
    
    var ArgsArr = Array.prototype.slice.call(arguments, 1);
    
    //console.log(ArgsArr);
    ArgsArr.forEach(function(cur) {
        console.log(2016 - cur >= limit);
        //return (2016 - cur);
    });
    
    //console.log(ArgsArr);
}

isFullAge5(21, 1999, 1995, 2002, 1985);
*/
//ES6

function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log(2016 - cur >= limit));
}

isFullAge6(21, 1999, 1995, 2002, 1985);



// Default parameters
// ES5

function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    
    lastName === undefined ? lastName = 'Smith': '';
    nationality === undefined ? nationality = 'US': '';
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
    
}

var john = new SmithPerson('John', 1990);

console.log(john);

var john2 = new SmithPerson('John', 1990, 'Williams');

console.log(john2);

//ES6

function SmithPerson6(firstName, yearoFBirth, lastName = 'Smith', nationality = 'US') {
        
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
    
}

var john3 = new SmithPerson('Mary', 1990, 'Williams');
console.log(john3);


// Maps

const question = new Map();
question.set('question', 'What is your name?');
question.set(1, 'John');
question.set(2, 'Mary');
question.set(3, 'Emily');
question.set(4, 'Mike');
question.set('correct', 4);
question.set(true, 'You are correct');
question.set(false, 'Please, try again');
/*
if (question.has(3)) {
    question.delete(3);
}
*/
//question.clear();

console.log(question.get('question'));
console.log(question.size);
            
//question.forEach((cur, key) => console.log(`This is ${key} and value ${cur}`));

for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`This is ${key} and value ${value}`);
    }
    
}

//const ans =  parseInt(prompt('Write the correct answer'));
/*
if (question.get('correct') === ans) {
    console.log(question.get(true));
} else {
    console.log(question.get(false));
}*/


//console.og(question.get(ans === question.get('correct')));


// Classes (syntax sugar) make easy to implement inheritance
/*
var Person55 = function(name, yearofBirth, job) {
    this.name = name;
    this.yearOfBirth = yearofBirth;
    this.job = job;
}

Person55.prototype.calculateAge = function() {
    var age = new Date().getFullYear - this.yearOfBirth;
    return age;
}
*/
//var john = new Person55('John', 1990, 'teacher');


class Person66 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;        
    }
    
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
        //console.log('red');
    }
    
    static greeting () {
        console.log('Hello world!');
    }
}

const emily6 = new Person66('Emily', 2000, 'designer');

emily6.calculateAge();
//emily6.greeting();
Person66.greeting();
console.log(emily6);


















