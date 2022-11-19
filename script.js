const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Lesotho is completely surrounded by South Africa',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'What is the capital of South Africa?',
    answers: [
      { text: 'Pretoria', correct: true },
      { text: 'Durban', correct: false },
      { text: 'Bloemfontein', correct: true },
      { text: 'Cape Town', correct: true }
    ]
  },
  {
    question: 'South Africa accounts for 80% of the worlds production of which precious metal?',
    answers: [
    { text: 'Gold', correct: false },
    { text: 'Platinum', correct: true },
    { text: 'Silver', correct: false },
    { text: 'Zinc', correct: false }
  ]
   },
  {
    question: 'How many offical languages are spoken in South Africa?',
    answers: [
      { text: '5', correct: false },
      { text: '11', correct: true },
      { text: '3', correct: false },
      { text: '7', correct: false }
    ]
  },
  {
    question: 'Which animal/s is NOT one of the big 5',
      answers: [
        { text: 'Hippopotamus', correct: true },
        { text: 'Giraffe', correct: true },
        { text: 'Cape Buffalo', correct: false },
        { text: 'Lion', correct: false }
      ]
      },
  {
  question: 'Table Mountain is a flat-topped mountain overlooking which city?',
    answers: [
      { text: 'Durban', correct: false },
      { text: 'Cape Town', correct: true },
      { text: 'Johannesburg', correct: false },
      { text: 'Port Elizabeth', correct: false }
    ]
    },
    {
      question: 'South Africa has no bear species.',
      answers: [
        { text: 'True', correct: true },
        { text: 'False' , correct: false }
      ]
    },
    {
    question: 'South Africa has few minerals.',
    answers: [
      { text: 'True', correct: false },
      { text: 'False' , correct: true }
    ]
  }
]