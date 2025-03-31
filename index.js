const quoteDisplay = document.getElementById('quote');
const quoteInput = document.getElementById('quote-input');
const timer = document.getElementById('time');
const startBtn = document.getElementById('start-test');
const resultsDiv = document.getElementById('results');
const timeResult = document.getElementById('time-result');
const wpmElement = document.getElementById('wpm');
const cpmElement = document.getElementById('cpm');
const accuracyElement = document.getElementById('accuracy');
const tryAgainBtn = document.getElementById('try-again');
const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "The best way to predict the future is to invent it.",
    "Simplicity is the ultimate sophistication.",
    "The only way to learn a new programming language is by writing programs in it.",
    "The journey of a thousand miles begins with one step.",
    "The only limit to our realization of tomorrow will be our doubts of today."
];
let timeLeft = 60;
let timerInterval;
let startTime;
let currentQuote = '';
let isTestRunning = false;
function startTest() {
    if (isTestRunning) return;
    isTestRunning = true;
    quoteInput.disabled = false;
    quoteInput.value = '';
    quoteInput.focus();
    resultsDiv.style.display = 'none';
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = '';
    currentQuote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quoteDisplay.appendChild(charSpan);
    });
    timeLeft = 60;
    timer.textContent = timeLeft;
    startTime = new Date();
    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}
function endTest() {
    clearInterval(timerInterval);
    isTestRunning = false;
    quoteInput.disabled = true;
    const endTime = new Date();
    const timeElapsed = Math.floor((endTime - startTime) / 1000);
    const typedText = quoteInput.value;
    const words = typedText.trim().split(/\s+/).filter(word => word.length > 0);
    const wpm = Math.floor((words.length / timeElapsed) * 60);
    const cpm = Math.floor((typedText.length / timeElapsed) * 60);
    let correctChars = 0;
    const quoteSpans = quoteDisplay.querySelectorAll('span');
    typedText.split('').forEach((char, index) => {
        if (index < quoteSpans.length && char === quoteSpans[index].innerText) {
            correctChars++;
        }
    });
    const accuracy = Math.floor((correctChars / typedText.length) * 100);
    timeResult.textContent = timeElapsed;
    wpmElement.textContent = wpm;
    cpmElement.textContent = cpm;
    accuracyElement.textContent = isNaN(accuracy) ? 0 : accuracy;
    resultsDiv.style.display = 'block';
}
quoteInput.addEventListener('input', () => {
    if (!isTestRunning) return;
    const typedText = quoteInput.value;
    const quoteSpans = quoteDisplay.querySelectorAll('span');
    quoteSpans.forEach((charSpan, index) => {
        const typedChar = typedText[index];
        if (typedChar == null) {
            charSpan.classList.remove('correct', 'incorrect');
        } else if (typedChar === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        } else {
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
        }
    });
    if (typedText.length === currentQuote.length) {
        endTest();
    }
});
startBtn.addEventListener('click', startTest);
tryAgainBtn.addEventListener('click', startTest);
quoteInput.disabled = true;