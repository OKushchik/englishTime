let words = document.querySelector('.word ol');
let explanation = document.querySelector('.explanation');


//Show list of words
let word = '';
for (let i=0; i<catalog.length; i++){
    word += `
    <li><span>${catalog[i].title}</span><a href=${catalog[i].pronounce} target="_blank"><i class="fas fa-volume-up"></i></a>
    </li>
    `;
}
words.innerHTML = word;

//event onclick word
let arrWords = document.querySelectorAll('.word ol li');
for (let i=0; i<arrWords.length; i++){
    arrWords[i].addEventListener('click', describe)
}

//show explanation
let explain = '';
function describe (e){
    let point = e.target.textContent;
    for (let i=0; i<catalog.length; i++){
        if(point === catalog[i].title){
            explain = `
                <p class="texDescription none">${catalog[i].description}</p>
                <img class="picDescription" src="img/${catalog[i].image}" alt="${catalog[i].title}"> 
                `;
        }
    }
    explanation.innerHTML = explain;
    let picDescription= document.querySelector('.picDescription');
    let texDescription = document.querySelector('.texDescription');
    explanation.addEventListener('click', openExample);
        function openExample() {
            texDescription.classList.toggle('block');
            texDescription.classList.toggle('bg-white');
            picDescription.classList.toggle('none');
    }
}
//////////////////
//Enter name
let inputName = document.querySelector('.inputName');
let sendName = document.querySelector('.sendName');
let listName = document.querySelector('.listName ul');
let selectedName = document.querySelector('.selectedName h3');
let chooseName = document.querySelector('.chooseName');

let arrName = [];
let newArrName;


sendName.onclick = addName;
inputName.addEventListener("keydown", event => {
    if (event.keyCode === 13) {
        addName();
    }
});
chooseName.addEventListener('click', randomIntName);

function draw() {
    let nameGet = '';
    for (let i=0; i<arrName.length; i++){
        nameGet += `<li><span>${arrName[i]}</span><button>delete</button></li>`;
    }
    listName.innerHTML = nameGet;
    inputName.value = '';
}

function addName (){
    if(inputName.value === ''){
        alert('Please Enter Your name')
    } else {
        arrName.push(inputName.value);
        draw();
        newArrName = arrName.slice();
        let buttonDel = document.querySelectorAll('.listName button');
        for (let i=0;i<buttonDel.length;i++) {
            buttonDel[i].addEventListener('click',delName)
        }
    }
};
function delName(e) {
    let delElem = e.target.previousElementSibling.textContent;
    for (let i=0; i<arrName.length; i++){
        if(arrName[i]===delElem){
            arrName.splice(i,1);
            newArrName = arrName.slice();
            draw()
        }
    }
    let buttonDel = document.querySelectorAll('.listName button');
    for (let i=0;i<buttonDel.length;i++) {
        buttonDel[i].addEventListener('click',delName)
    }
}

//random event name
function randomIntName() {
    let min = 0;
    let max = newArrName.length;
    let rand = min + Math.floor((max - min) * Math.random());
    selectedName.textContent = newArrName[rand];
    if (newArrName.length === 0 ) {
        alert('all done');
        newArrName = arrName.slice();
    } else {
        for (let i=0; i<newArrName.length; i++){
            if(newArrName[i] === newArrName[rand]) {
                newArrName.splice(i,1)
            }
        }
    }
}
//random Card
let btnChooseRandomName = document.querySelector('.btnChooseRandomName');
let randomCardImg = document.querySelector('.randomCardImg');
let randomCardTitle = document.querySelector('.randomCardTitle');
btnChooseRandomName.addEventListener('click', randomCard);


let arrPic = [];
function putPicInArr (){
    for (let i=0; i<catalog.length; i++){
        arrPic.push([catalog[i].image,catalog[i].title])
    }
}
putPicInArr();
function randomCard() {
    if(arrPic.length === 0){
        alert('all done');
        randomCardImg.setAttribute("src", ``);
        randomCardTitle.textContent = '';
        putPicInArr();
    } else {
        let min = 0;
        let max = arrPic.length;
        let rand = min + Math.floor((max - min) * Math.random());
        randomCardTitle.textContent = `${arrPic[rand][1]}`;
        randomCardImg.setAttribute("src", `img/${arrPic[rand][0]}`);
        arrPic.splice(rand,1);
    }
}
