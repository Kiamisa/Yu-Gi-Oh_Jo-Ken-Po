const state = {
    score:{
        playerScore: 0 ,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    actions:{
        button: document.getElementById("next-duel"),

    },
};

const path = ".src/assets/";

const cardData = [
    {
        id:0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${path}dragon.png`, 
        WinOf:[1],
        LoseOf:[2],
    },
    {
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: `${path}magician.png`, 
        WinOf:[2],
        LoseOf:[0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissors",
        img: `${path}exodia.png`, 
        WinOf:[0],
        LoseOf:[1],
    },
]




function init(){}

init();

