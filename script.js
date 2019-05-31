// Documentation : https://www.boredapi.com/documentation
// keys with a link "2095681", "3943506"

const apiUrl = 'http://www.boredapi.com/api/activity?';
const resultElem = document.querySelector('.result');
const randomBtn = document.getElementById('randomBtn');
const typeBtns = document.querySelectorAll('.typeBtn');

const init = () => {
    getRandomActivity();
    randomBtn.addEventListener('click', getRandomActivity);
    for (let i = 0; i < typeBtns.length; i++) {
        typeBtns[i].addEventListener('click', () => {
            getRandomActivity(`type=${typeBtns[i].dataset.type}`);
        })
    }
};

const getRandomActivity = (param = '') => {
    randomBtn.disabled = true;
    typeBtns.forEach(elem => {
        elem.disabled = true;
    });
    fetch(`${apiUrl}${param}`)
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
    resultElem.innerText = obj.activity;
    if (obj.hasOwnProperty('link')) {
        setActivityLink(obj.activity, obj.link);
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