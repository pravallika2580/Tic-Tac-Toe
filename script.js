console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

// Function to Change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to Check for a Win or Draw
const CheckWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let isDraw = true;

    let wins = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Col 1
        [1, 4, 7], // Col 2
        [2, 5, 8], // Col 3
        [0, 4, 8], // Diagonal
        [2, 4, 6], // Diagonal
    ];

    wins.forEach(e => {
        if (
            boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[1]].innerText === boxtexts[e[2]].innerText &&
            boxtexts[e[0]].innerText !== ""
        ) {
            document.querySelector('.info').innerHTML = `<strong>${boxtexts[e[0]].innerText} Wins! 🏅</strong>`;
            isgameover = true;
            document.querySelector('.imgBox').getElementsByTagName("img")[0].style.width = "300px";
            gameover.play();
            isDraw = false;
        }
    });

    // If all boxes are filled and no one won
    if (!isgameover) {
        for (let i = 0; i < boxtexts.length; i++) {
            if (boxtexts[i].innerText === "") {
                isDraw = false;
                break;
            }
        }
        if (isDraw) {
            document.querySelector('.info').innerHTML = `<strong>It's a Draw! 🤝</strong>`;
            isgameover = true;
            gameover.play();
        }
    }
};


// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', () => {
        // Prevent further clicks after game over
        if (boxtext.innerText === "" && !isgameover) {
            boxtext.innerText = turn;
            audioTurn.play();
            CheckWin();
            if (!isgameover) {
                turn = changeTurn();
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

// Listener for Reset Button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector('.imgBox').getElementsByTagName("img")[0].style.width = "0px";
});
