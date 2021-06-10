// create elements
import { gameValues } from "./gameValues";

export const screen = document.createElement('div');
screen.setAttribute('id', 'screen');
screen.style.display = 'flex';
screen.style.justifyContent = 'center';
screen.style.alignItems = 'center';
screen.style.width = '100%';
screen.style.height = '95vh';

export const gameFloor = document.createElement('div');
gameFloor.setAttribute('id', 'gameFloor');
gameFloor.style.width = `${gameValues.general.widthFloor}px`;
gameFloor.style.height = `${gameValues.general.heightFloor}px`;
gameFloor.style.border = 'blue 1px solid';
gameFloor.style.position = 'relative';
gameFloor.style.backgroundColor = "black";

// Create walls
export const walls = gameValues.maze.wallsInfos.map((wall, i) => {
    const w = document.createElement('div');
    w.setAttribute('id', `wall-${i}`);
    w.style.width = `${wall.width}px`;
    w.style.height = `${wall.height}px`;
    w.style.border = '#3F51B5 7px double';
    w.style.boxSizing = 'border-box';
    w.style.borderRadius = '2px';
    w.style.backgroundColor = 'black';
    w.style.position = 'absolute';
    w.style.top = `${wall.top}px`;
    w.style.left = `${wall.left}px`;
    return w;
});

// Create Food
export const foods = gameValues.food.foodsPosition.map((p, i) => {
    const f = document.createElement('div');
    f.setAttribute('id', p.id);
    f.style.width = `${gameValues.food.foodWidth}px`;
    f.style.height = `${gameValues.food.foodHeight}px`;
    f.style.backgroundColor = gameValues.food.foodColor;
    f.style.position = "absolute";
    f.style.top = `${p.top}px`;
    f.style.left = `${p.left}px`;
    return f;
});
