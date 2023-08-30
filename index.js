const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');

class TimerView extends HTMLElement {
    constructor() {
        // задать начальные значения переменной или повесить обработчики событий на этот элемент
        super();
    }

    connectedCallback() {
        const seconds = this.getAttribute('seconds');
        const toTime = this.getAttribute('to-time');
    }

    disconnectedCallback() {

    }

    static get observedAttributes() {
        return [seconds, to-time];
    }
    // возвращает массив имен атрибутов, за изменениями которых надо следить

    attributeChangeCallback(name, oldValue, newValue) {

    }
    // изменения атрибута

    method1() {

    }

    method2() {

    }
    method3() {

    }
}

customElements.define('timer-view', TimerView);

class StartBtn extends HTMLButtonElement {
    constructor() {
        super();

        this.addEventListener('click', this.startTimer);
    }

    startTimer() {

    }
}

startBtn.define('start-btn', StartBtn, {extends: 'button'});

class PauseBtn extends HTMLButtonElement {
    constructor() {
        super();

        this.addEventListener('click', this.pauseTimer);
    }

    pauseTimer() {
        
    }
}

pauseBtn.define('pause-btn', PauseBtnBtn, {extends: 'button'});

class ResetBtn extends HTMLButtonElement {
    constructor() {
        super();

        this.addEventListener('click', this.resetTimer);
    }

    resetTimer() {
        
    }
}

resetBtn.define('reset-btn', ResetBtn, {extends: 'button'});