let table = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

function render() {
    let i = 0;

    document.querySelectorAll('.container')[0].innerHTML = '';

    table.forEach((elem) => {
        if (elem == 0) {
            document.querySelectorAll('.container')[0].innerHTML += '<div class="block empty" data-index="' + i + '"></div>';
        } else {
            document.querySelectorAll('.container')[0].innerHTML += '<div class="block" data-index="' + i + '">' +
                elem + '</div>';
        }

        i++;
    });

    document.querySelectorAll('.block').forEach((elem) => {
        elem.addEventListener('click', (event) => {
            //console.log(event.target.dataset.index);
            checkIfMove(event.target.dataset.index);
            checkIfSolved();
        });
    });
}

function checkIfMove(index) {
    if (table[index] != 0) {
        if ((table.indexOf(0) == 4) || (table.indexOf(0) == 8) || (table.indexOf(0) == 12)) {
            if ((table[parseInt(index) - 1] == 0) || (table[parseInt(index) + 4] == 0) || (table[parseInt(index) - 4] == 0)) {
                move(index);
            }
        } else if ((table.indexOf(0) == 3) || (table.indexOf(0) == 7) || (table.indexOf(0) == 11)) {
            if ((table[parseInt(index) + 1] == 0) || (table[parseInt(index) + 4] == 0) || (table[parseInt(index) - 4] == 0)) {
                move(index);
            }
        } else {
            if ((table[parseInt(index) + 1] == 0) || (table[parseInt(index) - 1] == 0) || (table[parseInt(index) + 4] == 0) || (table[parseInt(index) - 4] == 0)) {
                move(index);
            }
        }
    }
}

function move(index) {
    table[table.indexOf(0)] = table[index];
    table[index] = 0;
    render();
}

function mix() {
    //    for(let i = 0; i < 2000; i++) {
    //        checkIfMove(Math.floor(Math.random() * Math.floor(16)));
    //    }
    let mixing = setInterval(() => {
        checkIfMove(Math.floor(Math.random() * Math.floor(16)));
    }, 5);

    setTimeout(() => {
        clearInterval(mixing);
        startTimer();
    }, 10000);
}

function checkIfSolved() {
    if (JSON.stringify(table) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0])) {
        setTimeout(() => {
            alert('wygrales!!!!!');
            clearInterval(timer);
        }, 100);

    }
}

function startTimer() {
    let m = 0;
    let s = 0;
    timer = setInterval(() => {
        if (s == 59) {
            s = 0;
            m++;
        } else {
            s++;
        }

        renderTime(m, s);
    }, 1000);
}

function renderTime(m, s) {
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    document.querySelectorAll('.timer')[0].innerHTML = m + ':' + s;
    console.log(m + s);
}

render();
//mix();
