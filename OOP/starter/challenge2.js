/*
(function() {
    
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans) {
        if (ans == this.correct) {
            console.log('It is a correct answer!');
        } else {
            console.log('The answer is wrong!');
        }
    }

    var q1 = new Question('Is the javascript the coolest programming language?', ['yes', 'no'], 0);
    var q2 = new Question('What is the name of these course\'s teacher?', ['John', 'Mikle', 'Jonas'], 2) ;
    var q3 = new Question('What is the best describing coding?', ['Hard', 'Boring', 'Fun', 'Tedious'], 2);

    var questions = [q1, q2, q3];
    
    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    var answer = parseInt(prompt('Please select the correct answer')); 

    questions[n].checkAnswer(answer);  
    
})();

*/



(function() {
    
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans, callback) {        
        var sc;
        
        if (ans == this.correct) {            
            console.log('It is a correct answer!');
            sc = callback(true);
        } else {
            console.log('The answer is wrong!');
            sc = callback(false);
        }        
        this.displayScore(sc); 
    }
    
    Question.prototype.displayScore = function(score) {
        console.log('Your current score is ' + score);
        console.log('----------------------------------------');
    }

    var q1 = new Question('Is the javascript the coolest programming language?', ['yes', 'no'], 0);
    var q2 = new Question('What is the name of these course\'s teacher?', ['John', 'Mikle', 'Jonas'], 2) ;
    var q3 = new Question('What is the best describing coding?', ['Hard', 'Boring', 'Fun', 'Tedious'], 2);

    var questions = [q1, q2, q3];
        
    function score() {
        var sc = 0;
        return function(correct) {
            if (correct) {
                sc++;
            } 
            return sc;
        }
    }
    
    var keepScore = score();
    
    function nextQuestion() {
        
        var n = Math.floor(Math.random() * questions.length);

        questions[n].displayQuestion();

        var answer = prompt('Please select the correct answer');        
        
        if (answer !== 'exit') {
            
            questions[n].checkAnswer(parseInt(answer), keepScore);            
            nextQuestion();    
        }
        
    }
    
    nextQuestion();
    
})();