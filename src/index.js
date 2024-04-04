class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.timerId = null;

        this.refs = {
            days: document.querySelector(`${selector} [data-value="days"]`),
            hours: document.querySelector(`${selector} [data-value="hours"]`),
            mins: document.querySelector(`${selector} [data-value="mins"]`),
            secs: document.querySelector(`${selector} [data-value="secs"]`),
        };

        this.start();
    }

    start() {
        this.timerId = setInterval(() => {
            const time = this.targetDate - Date.now();

            if (time <= 0) {
                clearInterval(this.timerId);
                return;
            }

            const { days, hours, mins, secs } = this.calculateTimeComponents(time);
            this.updateTimerFace(days, hours, mins, secs);
        }, 1000);
    }

    calculateTimeComponents(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);

        return { days, hours, mins, secs };
    }

    updateTimerFace(days, hours, mins, secs) {
        this.refs.days.textContent = this.pad(days);
        this.refs.hours.textContent = this.pad(hours);
        this.refs.mins.textContent = this.pad(mins);
        this.refs.secs.textContent = this.pad(secs);
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date(2024, 4, 17, 4, 40, 0, 0),
});