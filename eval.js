import notify from "./popup.js";
const isOperand = (str) => /^[0-9]+$/gi.test(str);
const isOperator = (str) => /[+\-*/^()]/gi.test(str);
const isAlphaNumeric = (str) => /^[a-z0-9]+$/gi.test(str);

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


const postfix = (arg, dec) => {
    const s = new Stack();

    let pfixarr = '';
    let itr = 1;
    for (let i = 0; i < arg.length; i++) {
        if (isAlphaNumeric(arg[i])) {
            pfixarr += arg[i];
        } else if (arg[i] == '(') {
            s.push(arg[i]);
        } else if (arg[i] == ')') {
            while (s.giveTop() != '(' && s.isEmpty() == false) {
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
        renderSteps(itr, arg[i], s.display(), pfixarr, dec);
        itr += 1;
    }

    while (!s.isEmpty()) {
        pfixarr += s.giveTop();
        renderSteps(itr, '#', s.display(), pfixarr, dec);
        s.pop();
        itr += 1;
    }
    return pfixarr;
};

function validate() {
    let name = document.getElementById('expn').value;
    console.log(name)
    let regex = /^[0-9^/*+-\s]+$/;
    let pfixName = name.replace(/\s/g, '');
    if (regex.test(name)) {
        return true;
    }
    return false;
}

// class of Stack
class Stack {
    constructor() {
        this.top = -1;
        this.stck = [];
    }

    //pushes into TOS

    push(data) {

        this.top += 1;
        this.stck[this.top] = data;

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
    topNext() {
        if (this.top - 1 == -1) {
            return '#';
        }
        return this.stck[this.top - 1];

    }

    // tells wether stack is empty or not
    isEmpty() {
        return this.top == -1;
    }

    display() {
        let dis = []
        for (let i = 0; i <= this.top; i++) {
            dis.push(this.stck[i]);
        }
        return dis;
    }
}

const evaluate = (arg) => {
    const s = new Stack();
    let argArr = arg.split(' ');
    let itr = 0;
    for (let i = 0; i < argArr.length; i++) {
        if (isOperand(argArr[i])) {
            s.push(argArr[i]);

        }
        else if (isOperator(argArr[i])) {

            let expn = `(${s.topNext()}${argArr[i]}${s.giveTop()})`;
            s.pop();
            s.pop();
            s.push(expn);


        }
        if (!(s.display()).toString().includes('#') || !(s.display()).toString().includes('undefined')) {
            renderSteps(i + 1, argArr[i], s.display());
        }
        itr += 1;
    }
    if (!(s.display()).toString().includes('#') || !(s.display()).toString().includes('undefined')) {

        return [(s.display()).toString(), itr];
    }


}





const renderSteps = (sn, expn, stack) => {

    const row = document.createElement('tr');
    const itr = document.createElement('td')
    const val = document.createElement('td')
    const stck = document.createElement('td')


    itr.innerText = sn;
    val.innerText = expn;
    stck.innerText = (stack.toString()).replace(/,/g, ' ')


    row.appendChild(itr);
    row.appendChild(val);
    row.appendChild(stck);

    document.getElementsByClassName('step-body')[0].append(row);


}



// let arg = document.getElementById('arg').value;
document.getElementById('evaluate').addEventListener('click', () => {
    if (validate() == true) {
        document.querySelector('.step-body').innerHTML = '';
        const arg = document.getElementById('expn').value;
        let [expn, itr] = evaluate(arg);
        let evalVal = eval(expn);

        document.getElementById("evalTable").rows[itr - 1].cells[2].innerHTML += ` =  ${evalVal}`
    }
    else {
        notify.addNotification({
            type: "error",
            title: "Error!",
            message: "Please try again!"
        });
        document.querySelector('.step-body').innerHTML = '';


    }


});


