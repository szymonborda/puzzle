let table = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let bgimg = '22';

function render() {
    let i = 0;

    document.querySelectorAll('.container')[0].innerHTML = '';

    table.forEach((elem) => {
        if (elem == 0) {
            document.querySelectorAll('.container')[0].innerHTML += '<div class="block empty" data-no="' + elem + '" data-index="' + i + '"></div>';
            console.log('0');
        } else {
            document.querySelectorAll('.container')[0].innerHTML += '<div class="block" data-no="' + elem + '" data-index="' + i + '" style=\'background-image:' + bgimg + '\'></div>';
            console.log('1');
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
        if ((table.indexOf(0) == 3) || (table.indexOf(0) == 6)) {
            if ((table[parseInt(index) - 1] == 0) || (table[parseInt(index) + 3] == 0) || (table[parseInt(index) - 3] == 0)) {
                move(index);
            }
        } else if ((table.indexOf(0) == 2) || (table.indexOf(0) == 5)) {
            if ((table[parseInt(index) + 1] == 0) || (table[parseInt(index) + 3] == 0) || (table[parseInt(index) - 3] == 0)) {
                move(index);
            }
        } else {
            if ((table[parseInt(index) + 1] == 0) || (table[parseInt(index) - 1] == 0) || (table[parseInt(index) + 3] == 0) || (table[parseInt(index) - 3] == 0)) {
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
        checkIfMove(Math.floor(Math.random() * Math.floor(9)));
    }, 5);

    setTimeout(() => {
        clearInterval(mixing);
        startTimer();
    }, 3000);
}

function checkIfSolved() {
    if (JSON.stringify(table) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 0])) {
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

//image choose
document.querySelectorAll('.img-choose').forEach((img) => {
    img.addEventListener('click', (chosenImg) => {
        bgimg = img.style.backgroundImage;
        console.log(bgimg);
        render();
    });
});
