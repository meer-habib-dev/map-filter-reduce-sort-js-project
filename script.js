const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaryBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// double everyones money 
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
}
// sorting the richest person;
function sortTheRichest() {
    data.sort((a,b) => b.money-a.money)
updateDOM()
}
//show only the millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}
//calculate the total amount 
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    updateDOM();
    const div = document.createElement('div');
    div.innerHTML = `
    <h3>Total Amount: <strong>${formatNumbers(wealth)}</strong>
    `
    main.appendChild(div)
}
// fetch random user and add money 

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

function addData(obj) {
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data) {
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `
        <strong>${item.name}</strong> ${formatNumbers(item.money)}
        `
        main.appendChild(element);
    })
}

//format numbers as money
function formatNumbers(number) {
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listeners 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortTheRichest);
showMillionaryBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
