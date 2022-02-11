// ()

// grabbing from index.html
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');

let playerLives = 5;

//linking text
playerLivesCount.textContent = playerLives;

//generating data
const getData = () => [
    { imgSrc: "./img/simon-lee1.jpg", name: "one" },
    { imgSrc: "./img/simon-lee2.jpg", name: "two" },
    { imgSrc: "./img/simon-lee3.jpg", name: "three" },
    { imgSrc: "./img/simon-lee4.jpg", name: "four" },
    { imgSrc: "./img/simon-lee5.jpg", name: "five" },
    { imgSrc: "./img/simon-lee6.jpg", name: "six" },
    { imgSrc: "./img/simon-lee7.jpg", name: "seven" },
    { imgSrc: "./img/simon-lee8.jpg", name: "eight" },
    { imgSrc: "./img/simon-lee1.jpg", name: "one" },
    { imgSrc: "./img/simon-lee2.jpg", name: "two" },
    { imgSrc: "./img/simon-lee3.jpg", name: "three" },
    { imgSrc: "./img/simon-lee4.jpg", name: "four" },
    { imgSrc: "./img/simon-lee5.jpg", name: "five" },
    { imgSrc: "./img/simon-lee6.jpg", name: "six" },
    { imgSrc: "./img/simon-lee7.jpg", name: "seven" },
    { imgSrc: "./img/simon-lee8.jpg", name: "eight" },
];

//randomizing the cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - .5);
    return cardData;
};

//generating cards
const cardGenerator = () => {
    const cardData = randomize();

    //generating all the cards
    cardData.forEach((item) => {

        //generating html
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");

        //adding classes to the generated html tags
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';

        //attaching the img source
        face.src = item.imgSrc;

        //adding an attribute to the card
        card.setAttribute('name', item.name);

        //attaching the cards to the section tag
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        //for each click, class .toggleCard is active, toggle card is used for animation
        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');

            //run the function to check the cards
            checkCards(e);
        });
    });
};

//check if the cards match
const checkCards = (e) => {
    //target is the element clicked on, the card relating to the specific img generated
    const clickedCard = e.target;

    //adding a new class to the clicked card
    clickedCard.classList.add('flipped');

    //saving in the flipped cards
    const flippedCards = document.querySelectorAll('.flipped');

    //selecting the toggle cards
    const toggleCard = document.querySelectorAll('.toggleCard');

    //if 2 cards are flipped
    if (flippedCards.length === 2) {
        //check if the attribute names of flipped cards match
        if (flippedCards[0].getAttribute('name') ===
            flippedCards[1].getAttribute('name')) {

            console.log('match');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        }
        else {
            console.log('no match');

            //for each card flipped as 'wrong' flip them back removing the class flipped back to its original state
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');

                //adding the animation with a delay
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });

            //update the players lives
            playerLives--;
            //update players live count to the html
            playerLivesCount.textContent = playerLives;

            //flip all cards back when playerlives hits 0
            if (playerLives === 0) {
                restart("Try Again");
            }
        }
    }

    //run to check if the user won the game
    if (toggleCard.length === 16) {
        restart("You Win");
    }
};

//restart the game
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll('.card');

    //cards are not clickable when updating when game ends
    section.style.pointerEvents = 'none';

    //index through the array and flip back all the cards
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');

        //delaying with a setTimeout
        setTimeout(() => {

            //make the cards clickable again when the game ends
            cards[index].style.pointerEvents = 'all';

            //update the randomize
            faces[index].src = itemSrc;

            //update the card names along with the randomize
            cards[index].setAttribute('name', item.name);

            //adding back the clickable to the cards
            section.style.pointerEvents = 'all';

        }, 1000)
    });

    //restart the player lives
    playerLives = 5;
    playerLivesCount.textContent = playerLives;

    //delay with a window alerting the user their score end, also added text to the restart function
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();
