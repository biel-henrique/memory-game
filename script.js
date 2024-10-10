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

function randomCards(){
    let firstSort = []
    let secondSort = []

    for(let index = 0; index < amountCardsNumber/2; index++){
        firstSort.push(sortBirds[index]) 
    }

    for(let index = 0; index < amountCardsNumber/2; index++){
        secondSort.push(firstSort[index])
    }

    let secondRandom = secondSort.sort(random)
    return [firstSort, secondRandom]
}

function addCards() {
    let index = 0
    const ul = document.querySelector('ul')

    let [firstSort, secondRandom] = randomCards()
    
    while (index < amountCardsNumber / 2) {
        let cards = `
            <li onclick="turnCard(this)" class="card ${index}">
            <figure class="front">
            <img src="images/assets/back.png">
            </figure>
            <figure class="verse">
            <img src="${firstSort[index]}">
            </figure>
            </li>
            <li onclick="turnCard(this)" class="card ${index + 1}">
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
    }
}
addCards()

function random() {
    return Math.random() - 0.5;
}

function turnCard(element) {
    let previewCard = document.querySelector('.container .turn .verse img');
    let verseElement = element.querySelector('.verse img')
    let ul = document.querySelectorAll('ul')
    console.log(ul)

    element.classList.add('turn')

    // if(previewCard == null){
    // element.classList.add('turn')
    // }else if(previewCard.src === verseElement.src){
    //     element.classList.add('turn')
    // }else {
    // verseElement.classList.remove('turn')
    // previewCard.classList.remove('turn')
    // }
}

