import Character from "./Character";

export default class PacMan extends Character {
    constructor (
        originalX,
        originalY,
        gameValues,
        victory
    ) {
        const _super = super(originalX, originalY, gameValues);
        this._super = _super;
        this.foodsPosition = gameValues.food.foodsPosition;
        this.foodHeight = gameValues.food.foodHeight;
        this.foodWidth = gameValues.food.foodWidth;
        this.countFoods = 0;
        this.sizePacman = gameValues.pacman.sizePacman;
        this.step = gameValues.pacman.step;
        this.directions = gameValues.general.directions;
        this.Victory = victory;
        this.maxFood = gameValues.food.maxFood;
        this.angleDirection = gameValues.general.angleDirection;
        this.foodAte =[];
        // Pac Body
        this.pac = document.createElement('div');
        this.pac.setAttribute('id', 'pacman');
        this.pac.style.width = `${this.sizePacman}px`;
        this.pac.style.height = `${this.sizePacman}px`;
        this.pac.style.borderRadius = '25px';
        this.pac.style.border = 'solid 2px black';
        this.pac.style.backgroundColor = '#d5b612';
        this.pac.style.position = 'absolute';
        this.pac.style.left = `${this.posX - 25}px`;
        this.pac.style.bottom = `${this.posY}px`;
        // Pac Mouth
        this.mouth = document.createElement('div');
        this.mouth.style.backgroundColor = "black";
        this.mouth.style.backgroundColor = "black";
        this.mouth.style.position = "absolute";
        this.mouth.style.width = "100%";
        this.mouth.style.height = "100%";
        this.mouth.style.clipPath = "polygon(100% 74%, 44% 48%, 100% 21%)";
        this.mouth.style.animationName = "eat";
        this.mouth.style.animationDuration = "0.7s";
        this.mouth.style.animationIterationCount = "infinite";
        this.pac.appendChild(this.mouth);
        this.initialization(this);
    }

    initialization = (_self) => {
        document.addEventListener('keydown', function(event) {
            if (_self.directions.includes(event.key)){
                _self._super.handleMove(event.key, _self.step)
                _self.updatePosition();
            }
        });
    }

    getPacMan = () => this.pac;

    getCountFood = () => this.countFoods;

    eatFood = () => {
        this.foodsPosition.forEach((f, i) => {
            // // We check if pac eat food vertically
            if (Math.abs((this._super.heightFloor - f.top + this.foodHeight) - this.posY) <= 3 ||
                Math.abs(this.posY + this.sizePacman - (this._super.heightFloor - f.top)) <= 3) {
                // We check if pacman is align with food laterally
                if(Math.abs(this.posX - f.left) < 10) {
                    const foodEl = document.getElementById(f.id);
                    if (foodEl) {
                        foodEl.style.display = 'none';
                        if (!this.foodAte.includes(f.id)) {
                            this.countFoods += 1;
                            this.foodAte.push(f.id);
                        }
                        if (this.countFoods === this.maxFood) {
                            this.Victory();
                        }
                    }
                }
            }

            // We check if pac eat food laterally
            if (Math.abs(this.posX + this.sizePacman - f.left) <= 3 ||
                Math.abs(f.left + this.foodWidth - this.posX) <= 3) {
                // We check if pacman is align with food vertically
                if(Math.abs(this.posY - (this._super.heightFloor - f.top)) <= 40) {
                    const foodEl = document.getElementById(f.id);
                    if (foodEl) {
                        foodEl.style.display = 'none';
                        if (!this.foodAte.includes(f.id)) {
                            this.countFoods += 1;
                            this.foodAte.push(f.id);
                        }
                        if (this.countFoods === this.maxFood) {
                            this.Victory();
                        }
                    }
                }
            }

        });
    }

    updatePosition = () => {
        this.pac.style.transform = `rotate(${this.angleDirection[this.direction]}deg)`;
        this.pac.style.left = `${this.posX - 25}px`;
        this.pac.style.bottom = `${this.posY}px`;
        this.eatFood();
    }

    stopPacmanMouth = () => {
        this.mouth.style.animationName = "";
    }
}
