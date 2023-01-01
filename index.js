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

    display() {
        let dis = []
        for (let i = 0; i <= this.top; i++) {
            dis.push(this.stck[i]);
        }
        return dis;
    }
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
        console.log(i, s.display(), pfixarr);
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
const row = document.createElement('tr');
const itr = document.createElement('td')
const val = document.createElement('td')
const stck = document.createElement('td')
const pfix = document.createElement('td')




const renderSteps = (sn, expn, stack, postfix, dec) => {
    if (dec) {
        const row = document.createElement('tr');
        const itr = document.createElement('td')
        const val = document.createElement('td')
        const stck = document.createElement('td')
        const pfix = document.createElement('td')


        itr.innerText = sn;
        val.innerText = expn;
        stck.innerText = stack;
        pfix.innerText = postfix;

        row.appendChild(itr);
        row.appendChild(val);
        row.appendChild(stck);
        row.appendChild(pfix);

        document.getElementsByClassName('step-body')[0].appendChild(row);
    }


}

// let arg = document.getElementById('arg').value;
document.getElementById('convert').addEventListener('click', () => {
    document.querySelector('.step-body').innerHTML = '';
    const arg = document.getElementById('expn').value;
    if (validate()) {
        document.querySelector('.footer').style.position = 'relative';
        document.getElementById('postfix').innerText = `${postfix(arg, true)}`;
        document.getElementById('prefix').innerText = ` ${prefix(arg, false)}`;
    } else {
        document.getElementById('ans').innerText = 'Invalid Expression!!!';
    }
});


const revStr = (str) => {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;

}

const prefix = (str) => {
    str = str.replace(/\(|\)/g, function (match) {
        if (match === "(") {
            return ")";
        } else {
            return "(";
        }
    });
    str = revStr(str);
    str = postfix(str);
    let preFixArr = revStr(str);
    return preFixArr;

}