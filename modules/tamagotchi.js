export class Tamagotchi {
    #hunger;
    #happiness;
    #hungerId;
    #happinessId;
    #isAlive;

    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.#hunger = 5;
        this.#happiness = 5;
        this.#isAlive = true;
    }

    getIsAlive() {

        return this.#isAlive;
    }

    getHunger() {
        return this.#hunger;
    }

    getHappiness() {
        return this.#happiness;
    }

    startHungerCountdown(element) {
        this.#updateHungerCountdown(element);

        this.#hungerId = setInterval(() => {
            this.#updateHungerCountdown(element);
        }, 3000)
    }

    #updateHungerCountdown(element) {
        this.#hunger--;
        element.innerText = `Hunger: ${this.#hunger}`;

        if (this.#hunger <= 0) {
            this.stopHungerCountdown();
            this.stopHappinessCountdown();
            this.#isAlive = false;
        }
        else {
            this.#isAlive = true;
        }

    }

    startHappinessCountdown(element) {
        this.#updateHappinessCountdown(element);

        this.#happinessId = setInterval(() => {
            this.#updateHappinessCountdown(element);
        }, 4300);
    }

    #updateHappinessCountdown(element) {
        this.#happiness--;
        element.innerText = `Happiness: ${this.#happiness}`;

        if (this.#happiness <= 0) {
            this.stopHappinessCountdown();
            this.stopHungerCountdown();
            this.#isAlive = false;
        }
        else {
            this.#isAlive = true;
        }

    }

    stopHungerCountdown() {
        clearInterval(this.#hungerId);
    }

    stopHappinessCountdown() {
        clearInterval(this.#happinessId);
    }

    startFeed(element) {
        this.#updateFeed(element);
    }
    
    #updateFeed(element) {
        this.#hunger++;
        element.innerText = `Hunger: ${this.#hunger}`;

        if (this.#hunger >= 10) {
            this.#hunger--
        }
    }

    startPlay(element) {
        this.#updatePlay(element);
    }

    #updatePlay(element) {
        this.#happiness++;
        element.innerText = `Happiness: ${this.#happiness}`;

        if (this.#happiness >= 10) {
            this.#happiness--
        }
    }
}