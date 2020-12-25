const inputContainer = document.getElementById('input-container');

const dateInput = document.getElementById('date-picker');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-btn');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-btn');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown; 

function updateCountdown(e){
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  if (countdownDate === '') {
    alert('Please select a date.');
  } else {
    countdownValue = new Date(countdownDate).getTime(); 
    updateDOM();
  }
}

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

function updateDOM(){
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const delta = countdownValue - now;

    const days = Math.floor(delta / day);
    const hours = Math.floor((delta % day) / hour);
    const minutes = Math.floor((delta % hour) / minute);
    const seconds = Math.floor((delta % minute) / second);

    inputContainer.hidden = true;

    if (delta < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = countdownTitle + ' finished on ' + countdownDate;
      completeEl.hidden = false;
    } else {
      countdownElTitle.textContent = countdownTitle;
      timeElements[0].textContent = days;
      timeElements[1].textContent = hours;
      timeElements[2].textContent = minutes;
      timeElements[3].textContent = seconds;

      inputContainer.hidden = true;
      countdownEl.hidden = false;
    }
  }, 1000);
}

function reset(e){
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
}

function load(){
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

const countdownForm = document.getElementById('countdownForm');
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
load();

