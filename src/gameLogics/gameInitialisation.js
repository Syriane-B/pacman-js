import PacMan from "../models/Pacman";
import Ghost from "../models/Ghost";
import { gameValues } from "./gameValues";
import { screen, gameFloor, walls, foods } from "./mazeSetup";

export function startGame() {
    // generate the level selector card card + title + select + button
    const onBoardindCard = document.createElement('div');
    onBoardindCard.style.width = "300px";
    onBoardindCard.style.height = "300px";
    onBoardindCard.style.border = "solid 3px #3F51B5";
    onBoardindCard.style.display = "flex";
    onBoardindCard.style.flexFlow = "column";
    onBoardindCard.style.justifyContent = "center";
    onBoardindCard.style.alignItems = "center";
    onBoardindCard.style.backgroundColor = "black";
    onBoardindCard.style.zIndex= 999;
    onBoardindCard.style.position = "absolute";
    onBoardindCard.style.left = `${gameValues.general.widthFloor/2 - 150}px`;
    onBoardindCard.style.top = `${gameValues.general.heightFloor/2 - 150}px`;
    const title = document.createElement('h3');
    title.innerText = "Please choose a level";
    title.style.color = "white";
    onBoardindCard.appendChild(title);
    const select = document.createElement('select');
    select.id = "selectLevel";
    onBoardindCard.appendChild(select);
    const level1 = document.createElement('option');
    level1.value = "1";
    level1.innerText = "easy";
    select.appendChild(level1);
    const level2 = document.createElement('option');
    level2.value = "2";
    level2.innerText = "medium";
    select.appendChild(level2);
    const level3 = document.createElement('option');
    level3.value = "3";
    level3.innerText = "hard";
    select.appendChild(level3);
    const level4 = document.createElement('option');
    level4.value = "4";
    level4.innerText = "impossible";
    select.appendChild(level4);
    const startBtn = document.createElement('button');
    startBtn.innerText = "Start !";
    startBtn.addEventListener('click', () => {
        // remove the card on boarding card
        onBoardindCard.remove();
        // init the game with the selected level
        initGame(select.value);
    });
    onBoardindCard.appendChild(startBtn);

    const root = document.getElementById('root');
    gameFloor.appendChild(onBoardindCard);
    screen.appendChild(gameFloor);
    root.appendChild(screen);
}


export function initGame(levelSelected) {
    let intervalGhostId = null;
    let ghosts = [];

    // initializing game elements
    const pacMan = new PacMan(
        350,
        50,
        gameValues,
        Victory
    );
    // Create Ghost
    function generateGhosts() {
        const ghost1 = new Ghost(
            350,
            350,
            gameValues,
            pacMan,
            GameOver
        );
        ghosts.push(ghost1);
        gameFloor.appendChild(ghost1.getGhost());
        intervalGhostId = setInterval(() => {
            let newGhost = new Ghost(
                350,
                350,
                gameValues,
                pacMan,
                GameOver
            );
            ghosts.push(newGhost);
            gameFloor.appendChild(newGhost.getGhost());
        }, 10000 / (levelSelected * 0.6));
    }
    function GameOver() {
        let newScore = -1;
        let oldScore = parseInt(getCookie("pacmanScore"));
        if (Number.isInteger(oldScore)) {
            newScore = oldScore + 1;
        }
        createCookie('pacmanScore', newScore, 5);
        const card = document.createElement('div');
        card.style.width = "300px";
        card.style.height = "300px";
        card.style.border = "solid 3px #3F51B5";
        card.style.display = "flex";
        card.style.flexFlow = "column";
        card.style.justifyContent = "center";
        card.style.alignItems = "center";
        card.style.backgroundColor = "black";
        card.style.zIndex= 999;
        card.style.position = "absolute";
        card.style.left = `${gameValues.general.widthFloor/2 - 150}px`;
        card.style.top = `${gameValues.general.heightFloor/2 - 150}px`;
        const text = document.createElement('div');
        text.innerHTML = "Game Over";
        text.style.color = "red";
        text.style.fontWeight = "bold";
        text.style.fontSize = "40px";
        card.appendChild(text);
        const scoreEl = document.createElement('div');
        scoreEl.innerHTML = `Youre score is ${score} points`;
        scoreEl.style.color = "red";
        scoreEl.style.fontWeight = "bold";
        scoreEl.style.textAlign = "center";
        scoreEl.style.fontSize = "20px";
        card.appendChild(scoreEl);
        gameFloor.appendChild(card);
        ghosts.forEach(ghost => {
            ghost.stopGhost();
        })
        clearInterval(intervalGhostId);
        pacMan.stopPacmanMouth();
    }
    function Victory() {
        let newScore = 1;
        let oldScore = parseInt(getCookie("pacmanScore"));
        if (Number.isInteger(oldScore)) {
            newScore = oldScore + 1;
        }
        createCookie('pacmanScore', newScore, 5);

        const card = document.createElement('div');
        card.style.width = "300px";
        card.style.height = "300px";
        card.style.border = "solid 3px #3F51B5";
        card.style.display = "flex";
        card.style.justifyContent = "center";
        card.style.flexFlow = "column"
        card.style.alignItems = "center";
        card.style.backgroundColor = "black";
        card.style.zIndex= 999;
        card.style.position = "absolute";
        card.style.left = `${gameValues.general.widthFloor/2 - 150}px`;
        card.style.top = `${gameValues.general.heightFloor/2 - 150}px`;
        const text = document.createElement('div');
        text.innerHTML = "You won!!";
        text.style.color = "red";
        text.style.fontWeight = "bold";
        text.style.fontSize = "40px";
        card.appendChild(text);
        const scoreEl = document.createElement('div');
        scoreEl.innerHTML = `Youre score is ${newScore} points`;
        scoreEl.style.color = "red";
        scoreEl.style.fontWeight = "bold";
        scoreEl.style.textAlign = "center";
        scoreEl.style.fontSize = "20px";
        card.appendChild(scoreEl);
        gameFloor.appendChild(card);
        ghosts.forEach(ghost => {
            ghost.stopGhost();
        })
        clearInterval(intervalGhostId);
        pacMan.stopPacmanMouth();
    }
    function createCookie(name, value, days)
    {
        let expires = '';
        if (days)
        {
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = ";expires=" + date.toGMTString();
        }
        document.Cookie = name + "=" + value + expires + ";domain=http://localhost;path=/;";
    }
    function getCookie(name)
    {
        if (document.cookie) {
            let nomRC = name + "=";
            let ca = document.Cookie.split(';');
            for(let i=0;i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);

                if (c.indexOf(nomRC) == 0)
                    return c.substring(nomRC.length, c.length);
            }
        }
        return "unknown";
    }

// we inject the element on root
    walls.forEach(wall => gameFloor.appendChild(wall));
    foods.forEach(food => gameFloor.appendChild(food));
    gameFloor.appendChild(pacMan.getPacMan());

// We create the ghosts
    generateGhosts();
}
