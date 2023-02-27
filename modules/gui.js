import { Tamagotchi } from "./tamagotchi.js";

export class TamagotchiGUI extends Tamagotchi {
    #container;
    #aliveId;

    constructor(name, type, container) {
        super(name, type);
        this.#container = container;
        this.#createDinosaurGUI();
    }

    #createDinosaurGUI() {
        const tamagotchi = document.createElement('div');
        tamagotchi.classList.add('tamagotchi');
        this.#container.append(tamagotchi);

        const typeInput = document.querySelector('#type');
        let type = typeInput.value;

        const img = document.createElement('img');
        tamagotchi.append(img);

        if (type == 'dinosaur') {
            img.src = '../images/trex.jpg';

        }
        else {
            img.src = '../images/mammoth.jpg';
        };

        const nameElement = document.createElement('h2');
        nameElement.classList.add('tam-name');
        nameElement.innerText = `${this.name} the ${this.type}`;
        tamagotchi.append(nameElement);

        const countContainer = document.createElement('div');
        countContainer.classList.add('count-container');
        tamagotchi.append(countContainer);

        const hungerElement = document.createElement('h6');
        countContainer.append(hungerElement);
        super.startHungerCountdown(hungerElement);

        const hapinessElement = document.createElement('h6');
        countContainer.append(hapinessElement);
        super.startHappinessCountdown(hapinessElement);

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('tam-btn-container');
        tamagotchi.append(btnContainer);

        const feedBtn = document.createElement('button');
        feedBtn.innerText = 'Feed';
        btnContainer.append(feedBtn);
        super.startFeed(hungerElement);
        feedBtn.addEventListener('click', () => {
            super.startFeed(hungerElement);
        });

        const playBtn = document.createElement('button');
        playBtn.innerText = 'Play';
        btnContainer.append(playBtn);
        super.startPlay(hapinessElement);
        playBtn.addEventListener('click', () => {
            super.startPlay(hapinessElement);
        });

        this.#checkIfAlive(img, nameElement, feedBtn, playBtn);
        this.checkFeeling(tamagotchi, this.name, img);
    };

    #checkIfAlive(img, name, feedBtn, playBtn) {
        this.#aliveId = setInterval(() => {
            this.getIsAlive()
            if (!this.getIsAlive()) {
                feedBtn.disabled = true;
                playBtn.disabled = true;

                img.src = '../images/rip.jpg';

                name.innerText = `${this.name} is dead!`;
                
                clearInterval(this.#aliveId);

            };
        }, 1000);
    };

    checkFeeling(tamagotchi, name) {
        const feeling = setInterval(() => {
            const hungerFeel = this.getHunger();
            const happinessFeel = this.getHappiness();
            if(hungerFeel >= 1 && hungerFeel <= 3 || happinessFeel >= 1 && happinessFeel <= 3) {
                tamagotchi.classList.add(`gonna-die-${name}`)
                anime({
                    targets: `.gonna-die-${name}`,
                    keyframes: [
                        {rotate: 1},
                        {rotate: 0},
                        {rotate: -1},
                    ],
                    duration: 300,
                    loop: false
                });
                if(hungerFeel == 0 || happinessFeel == 0) {
                    tamagotchi.classList.remove(`gonna-die-${name}`);
                    clearInterval(feeling);
                };
            };
        }, 800)
    };
};