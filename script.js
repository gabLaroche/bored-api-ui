// Documentation : https://www.boredapi.com/documentation

let apiUrl = 'https://www.boredapi.com/api/activity';
const baseApiUrl = 'https://www.boredapi.com/api/activity';
const resultElem = document.querySelector('.result');
const randomBtn = document.getElementById('randomBtn');
const typeBtns = document.querySelectorAll('[name=typeBtn]');
const nbParticipantsDropdown = document.getElementById('nbParticipants');
const resetBtn = document.querySelector('[type="reset"]');

const init = () => {
    getRandomActivity();
    addEvents();
};

const addEvents = () => {
    randomBtn.addEventListener('click', getRandomActivity);
    nbParticipantsDropdown.addEventListener('change', setNumberOfParticipants);
    resetBtn.addEventListener('click', () => {
        apiUrl = baseApiUrl;
    });
    for (let i = 0; i < typeBtns.length; i++) {
        typeBtns[i].addEventListener('change', setActivityType);
    }
};

const setNumberOfParticipants = () => {
    const numParticipants = parseInt(event.currentTarget.value);
    if (numParticipants === 0) {
        return;
    }
    if (apiUrl.includes('participants')) {
        if (apiUrl.includes('&')) {
            apiUrl = apiUrl.replace(/participants=.*&/gi, `participants=${numParticipants}&`);
        } else {
            apiUrl = apiUrl.substr(0, apiUrl.lastIndexOf('?')) + `?participants=${numParticipants}`;
        }
    } else {
        if (apiUrl.includes('?')) {
            apiUrl += `&participants=${numParticipants}`
        } else {
            apiUrl += `?participants=${numParticipants}`
        }
    }
};

const setActivityType = () => {
    const selectedType = event.currentTarget.id;
    if (selectedType === 'any') {
        return;
    }
    if (apiUrl.includes('type')) {
        if (apiUrl.includes('&')) {
            apiUrl = apiUrl.replace(/type=.*&/gi, `type=${selectedType}&`);
        } else {
            apiUrl = apiUrl.substr(0, apiUrl.lastIndexOf('?')) + `?type=${selectedType}`;
        }
    } else {
        if (apiUrl.includes('?')) {
            apiUrl += `&type=${selectedType}`
        } else {
            apiUrl += `?type=${selectedType}`
        }
    }
};

const getRandomActivity = () => {
    randomBtn.disabled = true;
    typeBtns.forEach(elem => {
        elem.disabled = true;
    });
    fetch(`${apiUrl}`)
        .then(obj => obj.json())
        .then(obj => {
            setResult(obj);
            randomBtn.disabled = false;
            typeBtns.forEach(elem => {
                elem.disabled = false;
            });
    });
};

const setResult = obj => {
    if (obj.activity) {
        resultElem.innerText = obj.activity;
        if (obj.hasOwnProperty('link')) {
            setActivityLink(obj.activity, obj.link);
        }
    } else {
        resultElem.innerText = 'Oops No results matched your query.';
    }
};

const setActivityLink = (activity, link) => {
    if (link.includes('http')) {
        resultElem.innerHTML = `<a href="${link}">${activity}</a>`;
    }
};

(function () {
    init();
}());