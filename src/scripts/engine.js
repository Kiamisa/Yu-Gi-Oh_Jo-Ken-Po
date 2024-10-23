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
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
};

const path = "./src/assets/icons/"; // Ajuste o caminho para corresponder ao local das imagens

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

    if (fieldSides === playerSides.player1) {
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
    
    console.log("Selecionando carta:", selectedCard); // Verificação no console

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

async function setCardField(index) {
    const card = cardData[index];
    console.log("Definindo campo para a carta:", card); // Verificação no console

    if (state.fieldCards.player.tagName === "IMG") {
        state.fieldCards.player.src = card.img; // Certifique-se de que o campo do jogador seja uma imagem
        state.fieldCards.player.setAttribute("data-id", index);
    } else {
        console.error("O elemento 'player-field-card' não é uma <img>");
    }
}

function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();
