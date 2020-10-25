/* Menu Secundario */
var menuDoc = document.getElementsByClassName('link-nav-arrow')[0];
var listSecond = document.querySelector('.list-nav-second');

menuDoc.addEventListener('click', function(){

    listSecond.classList.toggle('hide');
    menuDoc.classList.toggle('arrow');

});

/* Menu Hamburguer 
    Acionamento do Menu
*/

var iconMenu = document.querySelector('.icon-menu');
var content = document.querySelector('.content');
let body = document.querySelector("body");

iconMenu.addEventListener('click', function(){
    
    body.classList.toggle("_move")

});

/*recolhendo menu cliicando no content*/

content.addEventListener('click', function(){
    body.classList.remove('_move');
});

/* Menu Ativo - inserindo a class active */

let linkNavs = document.querySelectorAll(".link-nav");

linkNavs.forEach(function(currentValue, index, array){

    currentValue.addEventListener('click', function(){

        linkNavs.forEach((elemento)=>{
            elemento.classList.remove('active')
        })

        currentValue.classList.toggle('active');


    })

})

//Quiz
//Array of objects
const quiz = [
    {
        q : 'Qual a Cidade Natal do Goga?',
        options : ['Frankfurt', 'Ararangua', 'Hong Kong', 'Ulan Bator'],
        answer : 1
    },
    {
        q : 'Quantos Anos tem o Goga',
        options : ['89', '69', '78', '29'],
        answer : 3
    },
    {
        q : 'Qual o lazer preferido do Goga',
        options : ['Jogos Eletronicos', 'nadar em rio congelado', 'Caçar Javali', 'Pentiar Macaco'],
        answer : 0
    },
    {
        q : 'Comida Preferida do Goga',
        options : ['plastico', 'papel', 'Sushi', 'Vidro'],
        answer : 2
    },
    {
        q : 'Amor da Vida do Goga',
        options : ['Flavia', 'Ana Paulo Arosio', 'Hermione', 'Vera Verão'],
        answer : 0
    },
]

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

function setAvaibleQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
       availableQuestions.push(quiz[i])
    }
}

function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Pergunta " + (questionCounter + 1) + " de " + quiz.length; 
    //set question text

    //get randon question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    const index1 = availableQuestions.indexOf(questionIndex);

    availableQuestions.splice(index1,1);

    const optionLen = currentQuestion.options.length
    
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }

    optionContainer.innerHTML='';
    
    let animationDelay = 0.1;
    //create options i innerHTML

    for (let i=0; i<optionLen; i++) {
        //randon option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        
        const index2 = availableOptions.indexOf(optionIndex);
        
        availableOptions.splice(index2,1)

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
        
    }
    questionCounter++
}

function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;        
    }else{
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");

        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
            
        }
    }
    attempt++;
    unclickableOptions();   
}

function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
        
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length
    for (let i = 0; i < totalQuestion; i++) {
        const indicador = document.createElement("div");
        answersIndicatorContainer.appendChild(indicador);

        
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}

function next(){
    if (questionCounter === quiz.length) {
        quizOver();
    }else{
        getNewQuestion();
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2)+"%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers+" / "+quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();

}

function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide")
}

function startQuiz(){

    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvaibleQuestions();
    getNewQuestion();
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}




