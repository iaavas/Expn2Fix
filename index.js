let MAX = 100;

function validate() {
    let name = document.getElementById('expn').value;
    let regex = /^[A-Za-z0-9^/*+()-]+$/;

    if (regex.test(name)) {
        return true;
    }
    return false;
}

function precedence(c) {
    // () has lowest precedence
    if (c == '(' || c == ')') {
        return 0;
    }
    // for + -
    else if (c == '+' || c == '-') {
        return 1;
    }
    // for / *
    else if (c == '/' || c == '*') {
        return 2;
    }
    // ^ has highest precedence
    else if (c == '^') {
        return 3;
    }
    return -1;
}

const isAlphaNumeric = (str) => /^[a-z0-9]+$/gi.test(str);

// class of Stack
class Stack {
    constructor() {
        this.top = -1;
        this.stck = [];
    }

    //pushes into TOS

    push(data) {
        if (this.top == MAX - 1) {
            console.log('Stack Overflow');
        } else {
            this.top += 1;
            this.stck[this.top] = data;
        }
    }

    //pops the TOS
    pop() {
        if (this.top == -1) {
            return '1';
        } else {
            const val = this.stck[this.top];
            this.top -= 1;
            return val;
        }
    }

    // gives TOS
    giveTop() {
        if (this.top == -1) {
            return '#';
        }
        return this.stck[this.top];
    }

    // tells wether stack is empty or not
    isEmpty() {
        return this.top == -1;
    }
}

const postfix = (arg) => {
    const s = new Stack();

    let pfixarr = '';

    for (let i = 0; i < arg.length; i++) {
        if (isAlphaNumeric(arg[i])) {
            pfixarr += arg[i];
        } else if (arg[i] == '(') {
            s.push(arg[i]);
        } else if (arg[i] == ')') {
            while (s.giveTop() != '(') {
                pfixarr += s.giveTop();
                s.pop();
            }
            s.pop();
        } else if (precedence(arg[i]) > precedence(s.giveTop())) {
            s.push(arg[i]);
        } else if (precedence(arg[i]) == precedence(s.giveTop())) {
            pfixarr += s.giveTop();
            s.pop();
            s.push(arg[i]);
        } else if (precedence(arg[i]) < precedence(s.giveTop())) {
            while (precedence(s.giveTop()) >= precedence(arg[i])) {
                pfixarr += s.giveTop();
                s.pop();
            }
            s.push(arg[i]);
        }
    }

    while (!s.isEmpty()) {
        pfixarr += s.giveTop();
        s.pop();
    }
    document.getElementById('ans').innerText = pfixarr;
};

// let arg = document.getElementById('arg').value;
document.getElementById('convert').addEventListener('click', () => {
    const arg = document.getElementById('expn').value;
    if (validate()) {
        postfix(arg);
    } else {
        document.getElementById('ans').innerText = 'Invalid Expression!!!';
    }
});
