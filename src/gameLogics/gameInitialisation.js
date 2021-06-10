import PacMan from "../models/Pacman";
import Ghost from "../models/Ghost";
import { gameValues } from "./gameValues";
import { screen, gameFloor, walls, foods } from "./mazeSetup";

export function initGame() {
    const root = document.getElementById('root');
    let intervalGhostId = null;

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
        gameFloor.appendChild(ghost1.getGhost());
        intervalGhostId = setInterval(() => {
            gameFloor.appendChild(new Ghost(
                350,
                350,
                gameValues,
                pacMan,
                GameOver
            ).getGhost());
        }, 10000);
    }
    function GameOver() {
        const card = document.createElement('div');
        card.style.width = "300px";
        card.style.height = "300px";
        card.style.border = "solid 3px #3F51B5";
        card.style.display = "flex";
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
        gameFloor.appendChild(card);
    }
    function Victory() {
        const card = document.createElement('div');
        card.style.width = "300px";
        card.style.height = "300px";
        card.style.border = "solid 3px #3F51B5";
        card.style.display = "flex";
        card.style.justifyContent = "center";
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
        gameFloor.appendChild(card);
    }

// we inject the element on root
    walls.forEach(wall => gameFloor.appendChild(wall));
    foods.forEach(food => gameFloor.appendChild(food));
    gameFloor.appendChild(pacMan.getPacMan());
    screen.appendChild(gameFloor);
    root.appendChild(screen);

// We create the ghosts
    generateGhosts();
}
