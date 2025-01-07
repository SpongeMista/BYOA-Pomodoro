// Constants and variables
const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

let timeLeft = WORK_TIME;
let timerId = null;
let isWorkTime = true;

// Get DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeSelect = document.getElementById('mode-select');

// Event listeners
startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', resetTimer);
modeSelect.addEventListener('change', switchMode);

// Initialize the display
updateDisplay(timeLeft);

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the document title
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.title = `Pomodoro Timer (${timeString})`;
}

function switchMode() {
    // Clear any running timer
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }

    // Set the mode based on select value
    isWorkTime = modeSelect.value === 'work';
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    
    updateDisplay(timeLeft);
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            switchMode();
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
        }
    }, 1000);

    startButton.textContent = 'Pause';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay(timeLeft);
    startButton.textContent = 'Start';
} 