
(function() {

    var Question = function() {
        this.question = question;
        this.answers = answers;
        this.rightAnswer = rightAnswer;    
    }
    
    Question.prototype.printQnAnswers = function() {
        console.log(this.question);        
        for (var i = 0; i < this.answers.length; i++) {
            console.log(this .answers[i]);
        }        
    }
    
    function isCorrect(curAnswer, rightAnswer) {
        if (Number(curAnswer) === rightAnswer) {
            console.log('You are correct. The answer is ' + rightAnswer);
            return true;
        } else if (curAnswer === 'exit') { //exit option
            return -1;
        } else {
            console.log('You are not correct!');  
            return false;
        }
    }
    
    function randomQuestion() {
        var currentQuestion = Math.round(Math.random() * 2);
        arrQuestions[currentQuestion].printQnAnswers();        
        return arrQuestions[currentQuestion].rightAnswer;
    }

    var Question1 = new Question('1. My favourite color?', ['1 - red', '2 - green', '3 - blue'], 1);
    var Question2 = new Question('2. What is the fox name?', ['1 - Fox', '2 - Lis', '3 - Lisik'], 2);
    var Question3 = new Question('3. What is the favourite and the only thing Mishka like the most?', ['1 - Money','2 - Honey','3 - Sup'], 2);
    
    var arrQuestions = [Question1, Question2, Question3];
    
    var playerScore = 0;

    
    function askQuestion(score = 0) {           
        
            var rAns = randomQuestion();
            var yourCurrentAnswer = prompt('What is a correct answer? Please add number?');
        
            var x = isCorrect(yourCurrentAnswer, rAns);
            console.log(x);
            if (x !== -1) {               
                score++;
                console.log('Total score is ' + score);
                return askQuestion(score);                
            } else {
                return;
            }
    }

    askQuestion(playerScore);
    
})();