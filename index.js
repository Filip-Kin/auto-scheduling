const navLinks = document.getElementById('nav-links').children;

const shiftSelectDiv = document.getElementById('preferred');
const selectDiv = document.getElementById('select-period');
const menuDiv = document.getElementById('menu');
const mainDiv = document.getElementById('main');

const overlayDiv = document.getElementById('overlay');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');


// probably on the server
let firstDayDate = new Date('2021-10-30T00:00:00');
const shifts = {
    '000': {
        date: null,
        label: 'C',
        startTime: '7:45',
        endTime: '12:15'
    },
    '001': {
        date: null,
        label: 'D',
        startTime: '12:30',
        endTime: '17:00'
    },
    '002': {
        date: null,
        label: 'F',
        startTime: '16:45',
        endTime: '20:00'
    },
    '010': {
        date: null,
        label: 'C',
        startTime: '7:45',
        endTime: '12:15'
    },
    '011': {
        date: null,
        label: 'D',
        startTime: '12:30',
        endTime: '17:00'
    },
    '020': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '021': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '022': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    },
    '030': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '031': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '032': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    },
    '040': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '041': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '042': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    },
    '050': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '051': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '052': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    },
    '060': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '061': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '062': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    },
    '100': {
        date: null,
        label: 'C',
        startTime: '7:45',
        endTime: '12:15'
    },
    '101': {
        date: null,
        label: 'D',
        startTime: '12:30',
        endTime: '17:00'
    },
    '102': {
        date: null,
        label: 'F',
        startTime: '16:45',
        endTime: '20:00'
    },
    '110': {
        date: null,
        label: 'C',
        startTime: '7:45',
        endTime: '12:15'
    },
    '111': {
        date: null,
        label: 'D',
        startTime: '12:30',
        endTime: '17:00'
    },
    '120': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '121': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '122': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    },
    '130': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '131': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '132': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    },
    '140': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '141': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '142': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    },
    '150': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '151': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '152': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    },
    '160': {
        date: null,
        label: 'B',
        startTime: '5:15',
        endTime: '9:30'
    },
    '161': {
        date: null,
        label: 'M',
        startTime: '9:15',
        endTime: '14:30'
    },
    '162': {
        date: null,
        label: 'E',
        startTime: '13:45',
        endTime: '20:00'
    }
}
for (let i in shifts) {
    i.split('');
    shifts[i].date = new Date(firstDayDate.getTime() + ((24*60*60*1000) * (i[0]*7 + i[1])));
}

let userID = localStorage.getItem('userID') || null;
let minor = 2;
let finalAvailability = {};
let lastPreferred = ['001', '032', '062'];
let lastAvailability = ['001', '002', '011', '032', '052', '062'];

if (userID) {
    usernameInput.value = userID;
    navLinks[5].classList.remove('pure-menu-disabled');
}

loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userID = usernameInput.value;
    localStorage.setItem('userID', userID);
    navLinks[5].classList.remove('pure-menu-disabled');

    hideOverlay();

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
    // todo schedule view
});

document.getElementById('edit-0').addEventListener('click', () => {
    setTimeout(() => {
        navLinks[0].classList.remove('pure-menu-selected');
        navLinks[1].classList.remove('pure-menu-disabled');
        navLinks[1].classList.add('pure-menu-selected');
        selectDiv.style.opacity = 0;
        shiftSelectDiv.style.opacity = 0;
        setTimeout(() => {
            selectDiv.style.display = 'none';
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
const finalReviewTable = document.getElementById('shift-review-body');

document.getElementById('hours-submit').addEventListener('click', () => {
    getFinalAvailability();

    let tableInsert = '';
    for (let n in finalAvailability) {
        let i = finalAvailability[n];
        tableInsert += `<tr>
        <td>${i.date.getMonth()+1}/${i.date.getDate()}</td>
        <td>${i.date.getDay()}</td>
        <td>${i.label}</td>
        <td>${i.startTime}-${i.endTime}</td>
        <td>${(i.preferred) ? 'Preferred':'Available'}</td>
        </tr>`;
    }
    finalReviewTable.innerHTML = tableInsert;

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

function getFinalAvailability() {
    for (let i of selectedAbleShifts) {
        finalAvailability[i] = shifts[i];
        finalAvailability[i].available = true;
        finalAvailability[i].preferred = false;
    }
    for (let i of selectedWantShifts) {
        finalAvailability[i] = shifts[i];
        finalAvailability[i].available = true;
        finalAvailability[i].preferred = true;
    }
}