const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelector("#computer-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#player-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },

};


const path = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${path}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${path}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${path}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function creatCardImage(IdCard, fieldSides) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", `${path}card-back.png`); // Certifique-se de que o caminho está correto
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if (fieldSides === state.playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardField(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("mouseover", () => {
            drawSelectedCards(IdCard);
        });
    }
    return cardImage;
}

async function drawSelectedCards(index) {
    const selectedCard = cardData[index];
    
    console.log("Selecionando carta:", selectedCard);

    state.cardSprites.avatar.src = selectedCard.img;
    state.cardSprites.name.innerText = selectedCard.name;
    state.cardSprites.type.innerText = "Attribute : " + selectedCard.type;
}

async function drawCards(amount, fieldSides) {
    for (let i = 0; i < amount; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await creatCardImage(randomIdCard, fieldSides);

        document.getElementById(fieldSides).appendChild(cardImage);
    }
}

async function setCardField(cardId) {
    await removeAllCardImages();

    let computerCardId = await getRandomCardId();

    showHiddenCardFieldsImages(true);

    await hideCardDetails();

    await drawCardInfield(cardId, computerCardId);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function removeAllCardImages(){
    let {computerBox,player1Box}= state.playerSides;
    let imageElements = computerBox.querySelectorAll("img");
    imageElements.forEach((img)=> img.remove());

    imageElements = player1Box.querySelectorAll("img");
    imageElements.forEach((img)=> img.remove());
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "draw";
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "win";
        state.score.playerScore++;
    }
    
    if (playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "lose";
        state.score.computerScore++;
    }

    await playAudio(duelResults);

    return duelResults;
}

async function drawButton(text){
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.volume = 0.1;
    try{
        audio.play();
    }catch{};
}

async function hideCardDetails() {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = ""; 
}

async function showHiddenCardFieldsImages(value) {

    if (value === true){
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    } else if (value === false){
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
    
}

async function drawCardInfield(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}



function init() {

    showHiddenCardFieldsImages(false);

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.volume = 0.1;
    bgm.play();
}

init();
