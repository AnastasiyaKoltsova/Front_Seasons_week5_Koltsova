document.addEventListener('DOMContentLoaded', () => {
    let countdown;
    const timerDisplay = document.querySelector('.timer-view');
    class TimerView extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
                <div class="timer-view"></div>
            `;
            this.timerDisplay = this.shadowRoot.querySelector('.timer-view');
        }

        connectedCallback() {
            this.startTimer();
            this.addEventListener('starttimer', () => this.startTimer());
            this.addEventListener('pausetimer', () => this.pauseTimer());
            this.addEventListener('resettimer', () => this.resetTimer());
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'seconds' && !isNaN(newValue)) {
                this.startTimer(newValue);
            } else if (name === 'to-time') {
                const currentTime = new Date();
                const targetTime = new Date(newValue);
                const diff = targetTime - currentTime;
                const seconds = Math.floor(diff / 1000);
                this.startTimer(seconds);
            }   
        }

        static get observedAttributes() {
            return ['seconds', 'to-time'];
        }

        startTimer(seconds) {
            clearInterval(countdown);
            if (isNaN(seconds)) return;
            const endTime = Date.now() + seconds * 1000;
            this.displayTimer(seconds);
            countdown = setInterval(() => {
                const secondsLeft = Math.round((endTime - Date.now()) / 1000);
                if (secondsLeft < 0) {
                    clearInterval(countdown);
                    this.dispatchEvent(new CustomEvent('endtimer'));
                    return;
                }
                this.displayTimer(secondsLeft);
            }, 1000);
        }

        pauseTimer() {
            clearInterval(countdown);
        }

        resetTimer() {
            clearInterval(countdown);
            this.displayTimer(0);
        }

        displayTimer(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainderSeconds = seconds % 60;
            let display = '';
            if (hours > 0) {
                display += `${hours.toString().padStart(2, '0')}:`;
            }
            display += `${minutes.toString().padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;
            this.timerDisplay.textContent = display;
            document.title = display;
        }
    }

    customElements.define('timer-view', TimerView);

    const startButton = document.querySelector('.start');
    const pauseButton = document.querySelector('.pause');
    const resetButton = document.querySelector('.reset');

    startButton.addEventListener('click', () => {
        timerDisplay.dispatchEvent(new CustomEvent('starttimer'));
    });

    pauseButton.addEventListener('click', () => {
        timerDisplay.dispatchEvent(new CustomEvent('pausetimer'));
    });

    resetButton.addEventListener('click', () => {
        timerDisplay.dispatchEvent(new CustomEvent('resettimer'));
    });
});