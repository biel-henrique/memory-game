function amountCards() {
    let cardsNumber = Number(prompt('Escolha o número de cards entre 4 e 14: '))
    let odd = cardsNumber % 2
    while (cardsNumber < 4 || cardsNumber > 14 || isNaN(cardsNumber) || odd == 1 || !Number.isInteger(cardsNumber)) {
        alert('Resposta inválida. Responda com um número par entre 4 e 14')
        cardsNumber = Number(prompt('Escolha o número de cards entre 4 e 14: '))
        odd = cardsNumber % 2
    }
    return cardsNumber
}

let amountCardsNumber = amountCards()

let verseBirds = [
    'images/assets/unicornparrot.gif',
    'images/assets/bobrossparrot.gif',
    'images/assets/explodyparrot.gif',
    'images/assets/fiestaparrot.gif',
    'images/assets/metalparrot.gif',
    'images/assets/revertitparrot.gif',
    'images/assets/tripletsparrot.gif',
]
let sortBirds = verseBirds.sort(random)

function randomCards(){
    let firstSort = []

    for(let index = 0; index < amountCardsNumber/2; index++){
        firstSort.push(sortBirds[index])
    }

    let secondRandom = [...firstSort].sort(random)
    return [firstSort, secondRandom]
}

function addCards() {
    let index = 0
    const ul = document.querySelector('ul')

    let [firstSort, secondRandom] = randomCards()
    let secondCont = 0

    while (index < amountCardsNumber / 2) {
        let cards = `
            <li onclick="turnCard(this)" class="card ${secondCont}">
                <figure class="front">
                    <img src="images/assets/back.png">
            </figure>
                <figure class="verse">
                    <img src="${firstSort[index]}">
            </figure>
            </li>
            <li onclick="turnCard(this)" class="card ${secondCont + 1}">
                <figure class="front">
                    <img src="images/assets/back.png">
                </figure>
                <figure class="verse">
                    <img src="${secondRandom[index]}">
                </figure>
            </li>
            `
        ul.innerHTML += cards
        index++
        secondCont += 2
    }
}
addCards()

function random() {
    return Math.random() - 0.5;
}

function removeTurn(element, preview) {
    setTimeout(function() {
        element.classList.remove('turn'); // Remove a classe 'turn'
    }, 1000); // 1000 milissegundos = 1 segundo
    setTimeout(function() {
        preview.classList.remove('turn'); // Remove a classe 'turn'
    }, 1000); // 1000 milissegundos = 1 segundo
}

function showButtomReplay(){
    let addReplay = document.querySelector('.configButtom')
    let buttomReplay = `
        <buttom onclick="callButtomReplay()" class="buttom">
        Jogar Novamente
        </buttom>`
        addReplay.innerHTML += buttomReplay
        addReplay.classList.remove('hidden')
}

function callButtomReplay() {
    location.reload()
}

function finishAlert(cardNumbers, ul){
    setTimeout(function() {
        if (alreadyChecked.length === cardNumbers) {

            alert(`Parabéns, você conseguiu! E só levou ${count} tentativas!`);

            for (let i = 0; i < alreadyChecked.length; i++) {
                ul[i].classList.remove('turn');
                ul[i].setAttribute('onClick', 'turnCard(this)');
            }

            alreadyChecked = [];
            count = 0;

            showButtomReplay()
        }
    }, 1000);
}

let previewCard = null
let count = 0
let alreadyChecked = []

function turnCard(element) {

    let verseElementSRC = element.querySelector('.verse img').getAttribute('src')
    let previewCardSRC = ''
    let ul = document.querySelectorAll('li')

    if(previewCard === null){
        element.classList.add('turn')
        element.removeAttribute('onClick')
        previewCard = element
        alreadyChecked.push(verseElementSRC)
        count++
        return;
    }

    previewCardSRC = previewCard.querySelector('.verse img').getAttribute('src')

    if(previewCardSRC === verseElementSRC){
        element.classList.add('turn')
        element.removeAttribute('onClick')
        alreadyChecked.push(verseElementSRC)
        previewCard = null
    }else {
        element.classList.add('turn')
        previewCard.setAttribute('onClick', 'turnCard(this)')
        alreadyChecked.pop()
        removeTurn(element, previewCard)
        previewCard = null
    }

    count++

    finishAlert(amountCardsNumber, ul)

}
