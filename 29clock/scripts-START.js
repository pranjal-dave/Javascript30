let countdown;
const Timer = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function setTimer(seconds) {

    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {

    const minutes = Math.floor(seconds / 60);
    const leftSeconds = seconds % 60;
    const time = `${minutes}:${leftSeconds < 10 ? '0' : ''}${leftSeconds}`
    document.title = time;
    Timer.textContent = time;
}

function displayEndTime(seconds) {
    const end = new Date(seconds);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function start() {
    const secs = parseInt(this.dataset.time);
    setTimer(secs);
}

buttons.forEach(button => button.addEventListener('click', start));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    setTimer(mins * 60 );
    this.reset();  //clear textField after 
});