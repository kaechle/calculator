var display = document.getElementById('output');
var input = '0';
var output = '0';
var answer = '';
var addedOperator = false;
var clearButton = document.getElementById('AC');

displayHTML(input);

function numbers(value) {
    if (input === '0' && output === '0') {
        input = value;
        displayHTML(input);
        clearButton.innerHTML = 'C';
    } else {
        if (addedOperator) {
            output += input;
            input = value;
            displayHTML(input);
            addedOperator = false;
        } else {
            input += value;
            displayHTML(input);
            addedOperator = false;
        }
    }
}

var test = input.slice(input.length);

function displayHTML(value) {
    if (input.length < 8) {
        displayFontSize(50);
    } else if (input.length < 12) {
        displayFontSize(32);
    } else if (input.length < 15) {
        displayFontSize(26);
    }
    display.innerHTML = value;
}

function displayFontSize(num) {
    display.style.fontSize = num + 'px';
}

function addOperator(value) {
    if (addedOperator) {
        return;
    } else {
        input += value;
        addedOperator = true;
    }
}

function equals() {
    answer = math.eval(output.concat(input));
    output = answer;
    input = '0';
    displayHTML(answer);
}

function funcClear() {
    clearButton.innerHTML = 'AC';
    input = '0';
    output = '0';
    displayHTML(input);
    displayFontSize(50);
}

function funcNegPos() {
    var neg = '-';
    if (input.charAt(0) !== '-') {
        input = neg.concat(input);
    } else {
        input = input.replace(/\-/, "");
    }
    displayHTML(input);
}

function funcPercent() {
    if (input === '0') {
        input = math.eval(answer * 0.01);
    } else {
        input = math.eval(input * 0.01);
    }
    displayHTML(input);
}

var dragWindow = function() {
    return {
        move : function(divid, xpos, ypos) {
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving : function(divid, container, evt) {
            evt = evt || window.event;
            var posX = evt.clientX,
                posY = evt.clientY,
            divTop = divid.style.top,
            divLeft = divid.style.left,
            eWi = parseInt(divid.style.width),
            eHe = parseInt(divid.style.height),
            cWi = parseInt(document.getElementById(container).style.width),
            cHe = parseInt(document.getElementById(container).style.height);
            document.getElementById(container).style.cursor='move';
            divTop = divTop.replace('px','');
            divLeft = divLeft.replace('px','');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function(evt){
                evt = evt || window.event;
                var posX = evt.clientX,
                    posY = evt.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                    if (aX < 0) aX = 0;
                    if (aY < 0) aY = 0;
                    if (aX + eWi > cWi) aX = cWi - eWi;
                    if (aY + eHe > cHe) aY = cHe -eHe;
                dragWindow.move(divid,aX,aY);
            }
        },
        stopMoving : function(container) {
            var a = document.createElement('script');
            document.getElementById(container).style.cursor='default';
            document.onmousemove = function() {}
        },
    }
}();