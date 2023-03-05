
class Stack {
    items;
    tempItems;
    isTopOperator;
    isTopDot;
    operators;
    isCalculated;
    constructor() {
        this.items = ['0'];
        this.tempItems = "0";
        this.isTopOperator = false;
        this.isTopDot = false;
        this.isCalculated = false;
        this.operators = ['+', '-', '/', '*'];
    }

    allClear() {
        this.items = ['0'];
        this.tempItems = "0";
        this.isTopOperator = false;
        this.isTopDot = false;
        this.isCalculated = false;
    }
    clear() {
        // if (this.tempItems.length == 1 && this.items.length == 1) {
        //     return;
        // }
        const x = this.tempItems.split('');
        x.pop();
        console.log(x);
        if (!x.length) {
            this.items = ['0'];
            this.tempItems = '0';
            return;
        }
        this.tempItems = x.join('');
        this.items[this.items.length - 1] = this.tempItems;
        if (!this.tempItems) {
            this.items.pop();
            if (this.items.length) {
                this.tempItems = this.items[this.items.length - 1];
            } else {
                this.tempItems = "";
            }
        };
        if (this.operators.includes(this.tempItems[this.tempItems.length - 1])) {
            this.isTopOperator = true;
            this.isTopDot = false;
        }
        else if (this.tempItems[this.tempItems.length - 1] == '.') {
            this.isTopDot = true;
            this.isTopOperator = false;
        } else {
            this.isTopOperator = false;
            this.isTopDot = false;
        }
    }
    addString(char) {
        if (this.isCalculated) {
            this.items = [];
            this.tempItems = "";
            this.isTopOperator = false;
            this.isTopDot = false;
            this.isCalculated = false;
        }
        if ((this.operators.includes(this.tempItems[this.tempItems.length - 1])) && this.tempItems.length === 1) {
            const x = this.tempItems.split('');
            x.pop();
            this.tempItems = x.join('');
        }
        if (this.tempItems.length >= 14 && !this.isTopOperator) {
            this.notify('Maximum value reached');
            return;
        }
        if (char == '.' && this.tempItems.includes('.') && !this.isTopOperator) {
            this.notify('Syntex Error');
            return;
        }
        char === '.' ? this.isTopDot = true : this.isTopDot = false;
        this.isTopOperator = false;
        if ((this.tempItems[this.tempItems.length - 1] == '/') || (this.tempItems[this.tempItems.length - 1] == '*') || (this.tempItems[this.tempItems.length - 1] == '+') || (this.tempItems[this.tempItems.length - 1] == '-')) {
            this.items.push(this.tempItems[this.tempItems.length - 1]);
            this.items.push(char);

            this.tempItems = "";
        }
        this.tempItems += char;
        if ((this.items[this.items.length - 1] == '+' || this.items[this.items.length - 1] == '-' || this.items[this.items.length - 1] == '/' || this.items[this.items.length - 1] == '*') && this.items.length > 0) {
            this.items.push(this.tempItems);
        }
        else if (this.items.length > 0) {
            this.items[this.items.length - 1] = this.tempItems;
        } else {
            this.items[0] = this.tempItems;
        }



    }
    operator(char) {
        this.isCalculated = false;
        if (this.tempItems[this.tempItems.length - 1] === '.') {
            this.isTopDot = true;
            this.notify('Syntex Error');
            return;
        }
        this.isTopOperator = true;
        if (this.tempItems.length > 0 && (this.tempItems[this.tempItems.length - 1] != '/') && (this.tempItems[this.tempItems.length - 1] != '*') && (this.tempItems[this.tempItems.length - 1] != '+') && (this.tempItems[this.tempItems.length - 1] != '-')) {
            this.tempItems += char;
        } else {

            const x = this.tempItems.split('');
            x.pop();
            this.tempItems = x.join('');
            this.tempItems += char;
        }
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length > 0) {
            this.items.pop();
        }
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
    value() {
        return { stack: this.items, temp: this.tempItems, isTopOperator: this.isTopOperator, isTopDot: this.isTopDot, isCalculated: this.isCalculated };
    }
    actualDigit() {
        const x = [...this.items];
        x.pop();
        x.push(this.tempItems);

        return x.map(x => `<span>${x}</span>`).join('');
    }
    presence(char) {
        if (char == '/' || char == '*') return 1;
        return 0;
    }
    getResult() {
        if (this.isTopDot || this.isTopOperator) {
            this.notify('Syntext Error');
            return;
        }
        this.isCalculated = true;
        const result = [];
        const stack = [];
        for (const item of this.items) {
            if (!this.operators.includes(item)) {
                result.push(item);
            } else {
                if ((!stack.length) || (this.presence(item) > this.presence(stack[stack.length - 1]))) {
                    stack.push(item);
                } else {
                    while (stack.length) {
                        result.push(stack[stack.length - 1]);
                        stack.pop();
                    }
                    stack.push(item);
                }
            }
        }
        while (stack.length) {
            result.push(stack[stack.length - 1]);
            stack.pop();
        }

        for (let i = 0; i < result.length; i++) {
            if (this.operators.includes(result[i])) {
                const first = result[i - 2];
                const second = result[i - 1];
                let sum;
                if (result[i] == '+') {
                    sum = Number(first) + Number(second);
                } else if (result[i] == '-') {
                    sum = Number(first) - Number(second);
                } else if (result[i] == '*') {
                    sum = Number(first) * Number(second);
                } else {
                    sum = Number(first) / Number(second);
                }
                result[i - 1] = sum;
                result.splice(i, 1);
                result.shift();
                i -= 2;
            }
        }
        this.items = [Number(result[0]).toFixed(2)];
        this.tempItems = Number(result[0]).toFixed(2) + "";
        return Number(result[0]).toFixed(2);


    }
    notify = (text) => {
        new Noty({
            type: 'error',
            text: text,
            timeout: 3000,
            layout: 'topRight'
        }).show();
    };
}
const myStack = new Stack();

const handleButtonClick = (text, isOperator = false) => {

    if (isOperator) {
        if (text == 'AC') myStack.allClear();
        else if (text == 'C') myStack.clear();
        else if (text == '/' || text == '*' || text == '+' || text == '-') myStack.operator(text);
        else if (text == '=') {
            if (myStack.getResult()) {
                document.querySelector('.calculation').innerText = myStack.getResult();
                return;
            }
        };
    } else {
        myStack.addString(text);
    }
    console.log(myStack.value());
    document.querySelector('.show-digit').innerHTML = myStack.actualDigit();
};

const buttons = Array.from(document.querySelectorAll('.button-container div'));
buttons.forEach(x => {
    x.addEventListener('click', function (e) {
        e.target.classList.add('clicked');
        setTimeout(() => {
            e.target.classList.remove('clicked');
        }, 250);
        e.target.getAttribute('valid') ? handleButtonClick(e.target.innerText) : handleButtonClick(e.target.innerText, true);
    });
});
let DarkMode = true;
const darkMode = {
    mainBg: '#22252D',
    buttonsBg: '#2A2D37',
    buttonBg: '#282B33',
    button1: '#fff',
    button2: '#79E7D4',
    button3: '#F0A0A6',
    calculationColor: '#d4af37',
    calculationArea: '#2a2e3d',
    activeColor: '#97A9C8',

    inactiveColor: '#fff'
};
const lightMode = {
    mainBg: '#DCDCDC',
    buttonsBg: '#f0f0f0',
    buttonBg: '#f2f2f2',
    button1: '#333333',
    button2: '#3AEBC9',
    button3: '#EC7B7D',

    calculationColor: '#22252d',
    calculationArea: '#f5f5f5',
    activeColor: '#fff',
    inactiveColor: '#97A9C8'

};
document.querySelector('.switcher').addEventListener('click', function () {
    const switcher = document.querySelector('.switcher-circle');
    let mode;

    if (DarkMode) {
        switcher.classList.remove('switch-right');
        switcher.classList.add('switch-left');
        DarkMode = false;

        mode = lightMode;
    } else {
        switcher.classList.remove('switch-left');
        switcher.classList.add('switch-right');
        DarkMode = true;
        mode = darkMode;
    }
    const root = document.documentElement;
    root.style.setProperty('--main-bg', mode.mainBg);
    root.style.setProperty('--buttons-bg', mode.buttonsBg);
    root.style.setProperty('--button-bg', mode.buttonBg);
    root.style.setProperty('--button-one-color', mode.button1);
    root.style.setProperty('--button-two-color', mode.button2);
    root.style.setProperty('--button-three-color', mode.button3);
    root.style.setProperty('--calculation-color', mode.calculationColor);
    root.style.setProperty('--calculation-bg', mode.calculationArea);
    root.style.setProperty('--active-mode-color', mode.activeColor);
    root.style.setProperty('--inactive-mode-color', mode.inactiveColor);
})

