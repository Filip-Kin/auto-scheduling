const navLinks = document.getElementById('nav-links').children;

const shiftSelectDiv = document.getElementById('preferred');
const overlayDiv = document.getElementById('overlay');
const menuDiv = document.getElementById('menu');
const mainDiv = document.getElementById('main');

const nameSelectDiv = document.getElementById('signin');
const nameSelectForm = document.getElementById('name-select');
const nameSelectBox = document.getElementById('name');
const nameSelectSubmit = document.getElementById('name-submit');

let userID = localStorage.getItem('userID') || null;
let minor = 2;
let lastPreferred = ['001', '032', '062'];
let lastAvailability = ['001', '002', '011', '032', '052', '062'];

if (userID) {
    document.querySelector(`#name > option[value="${userID}"]`).selected = true;
    nameSelectSubmit.classList.remove('pure-button-disabled');
    navLinks[5].classList.remove('pure-menu-disabled');
}

nameSelectBox.addEventListener('change', () => {
    nameSelectSubmit.classList.remove('pure-button-disabled');
    navLinks[5].classList.remove('pure-menu-disabled');
});

nameSelectForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userID = nameSelectBox.value;
    localStorage.setItem('userID', userID);

    displayOverlay();

    return false;
});

function displayOverlay() {
    overlayDiv.style.opacity = 0;
    overlayDiv.style.display = 'block';
    setTimeout(() => {
        menuDiv.classList.add('blur');
        mainDiv.classList.add('blur');
        overlayDiv.style.opacity = 1;
    }, 50)
}

function hideOverlay() {
    menuDiv.classList.remove('blur');
    mainDiv.classList.remove('blur');
    overlayDiv.style.opacity = 0;
    setTimeout(() => {
        overlayDiv.style.display = 'none';
    }, 400);
}

document.getElementById('view-schedule').addEventListener('click', () => {
    hideOverlay();
});

document.getElementById('edit-0').addEventListener('click', () => {
    hideOverlay();
    setTimeout(() => {
        navLinks[0].classList.remove('pure-menu-selected');
        navLinks[1].classList.remove('pure-menu-disabled');
        navLinks[1].classList.add('pure-menu-selected');
        nameSelectDiv.style.opacity = 0;
        shiftSelectDiv.style.opacity = 0;
        setTimeout(() => {
            nameSelectDiv.style.display = 'none';
            shiftSelectDiv.style.display = 'block';
            setTimeout(() => { shiftSelectDiv.style.opacity = 1; }, 50);
        }, 400);
    }, 200);
});

document.getElementById('edit-1').addEventListener('click', () => {
    hideOverlay();
    navLinks[0].classList.remove('pure-menu-selected');
    navLinks[1].classList.remove('pure-menu-disabled');
    navLinks[1].classList.add('pure-menu-selected');
    nameSelectDiv.style.opacity = 0;
    shiftSelectDiv.style.opacity = 0;
    setTimeout(() => {
        nameSelectDiv.style.display = 'none';
        shiftSelectDiv.style.display = 'block';
        setTimeout(() => { shiftSelectDiv.style.opacity = 1; }, 50);
    }, 400);
});

const DISABLED_SHIFTS = {
    2: ['20', '21', '30', '31', '40', '41', '50', '51', '60', '61'],
    1: ['20', '21', '30', '31', '40', '41', '50', '51', '60', '61'],
    0: []
};

function clearShifts() {
    for (let shift of document.querySelectorAll('.shift')) {
        shift.classList.remove('shift-selected');
        remove((type) ? selectedAbleShifts : selectedWantShifts, week.toString() + shift.id);
    }
}

function loadNextShifts(selections, week) {
    for (let shift of document.querySelectorAll('.shift')) {
        if (selections.includes(week.toString() + shift.id)) {
            shift.classList.add('shift-selected');
        } else {
            shift.classList.remove('shift-selected');
        }
    }
}

function remove(array, element) {
    index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

let selectedWantShifts = [];
let selectedAbleShifts = [];

let week = 0; // 0 is first week 1 is second week
let type = 0; // 0 is want 1 is able

for (let shift of document.querySelectorAll('.shift')) {
    if (DISABLED_SHIFTS[minor].includes(shift.id)) {
        shift.classList.add('shift-disabled');
        continue;
    }

    shift.addEventListener('click', () => {
        if (shift.classList.contains('shift-selected')) {
            shift.classList.remove('shift-selected');
            remove(selectedWantShifts, week.toString() + shift.id);
            if (type === 1) remove(selectedAbleShifts, week.toString() + shift.id);
        } else {
            shift.classList.add('shift-selected');
            ((type) ? selectedAbleShifts : selectedWantShifts).push(week.toString() + shift.id);
        }
    });
}

const nextWeekButton = document.getElementById('next-week');
const clearWeekButton = document.getElementById('clear-schedule');
const copyLastWeekButton = document.getElementById('copy-from-last-week');
const continueButton = document.getElementById('continue-button');

nextWeekButton.addEventListener('click', () => {
    if (week === 0) {
        week = 1;
        loadNextShifts((type) ? selectedAbleShifts : selectedWantShifts, 1);
        nextWeekButton.innerText = 'Previous Week';
        continueButton.classList.remove('pure-button-disabled');
    } else {
        week = 0;
        loadNextShifts((type) ? selectedAbleShifts : selectedWantShifts, 0);
        nextWeekButton.innerText = 'Next Week';
    }
});

clearWeekButton.addEventListener('click', () => {
    clearShifts();
});

copyLastWeekButton.addEventListener('click', () => {
    let array = (type) ? selectedAbleShifts : selectedWantShifts;
    let newArray = [];
    if (week === 0) {
        for (let i of array) {
            if (i.startsWith('1')) {
                newArray.push(i);
            }
        }
        for (let i of ((type) ? lastAvailability : lastPreferred)) {
            newArray.push(i);
        }
        loadNextShifts(newArray, 0);
    } else {
        for (let i of array) {
            if (i.startsWith('0')) {
                newArray.push(i);
                newArray.push('1' + i.substr(1));
            }
        }
        loadNextShifts(newArray, 1);
    }
    (type) ? selectedAbleShifts = newArray : selectedWantShifts = newArray;
});

const hoursSelectDiv = document.getElementById('hours');

continueButton.addEventListener('click', () => {
    if (type === 0) {
        selectedAbleShifts = selectedWantShifts;
        week = 0;
        type = 1;
        loadNextShifts(selectedAbleShifts, 0);
        nextWeekButton.innerText = 'Next Week';
        document.getElementById('preferred-instructions').innerHTML = 'Now select the shifts you are <i>able</i> to work';

        navLinks[1].classList.remove('pure-menu-selected');
        navLinks[2].classList.remove('pure-menu-disabled');
        navLinks[2].classList.add('pure-menu-selected');
        continueButton.classList.add('pure-button-disabled');
    } else {
        navLinks[2].classList.remove('pure-menu-selected');
        navLinks[3].classList.remove('pure-menu-disabled');
        navLinks[3].classList.add('pure-menu-selected');
        shiftSelectDiv.style.opacity = 0;
        hoursSelectDiv.style.opacity = 0;
        setTimeout(() => {
            shiftSelectDiv.style.display = 'none';
            hoursSelectDiv.style.display = 'block';
            setTimeout(() => { hoursSelectDiv.style.opacity = 1; }, 50);
        }, 400);
    }
});

const submitSelectDiv = document.getElementById('final-submit');

document.getElementById('hours-submit').addEventListener('click', () => {
    navLinks[3].classList.remove('pure-menu-selected');
    navLinks[4].classList.remove('pure-menu-disabled');
    navLinks[4].classList.add('pure-menu-selected');
    hoursSelectDiv.style.opacity = 0;
    submitSelectDiv.style.opacity = 0;
    setTimeout(() => {
        hoursSelectDiv.style.display = 'none';
        submitSelectDiv.style.display = 'block';
        setTimeout(() => { submitSelectDiv.style.opacity = 1; }, 50);
    }, 400);
});