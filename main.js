import { TamagotchiGUI } from "./modules/gui.js";
import { Tamagotchi } from "./modules/tamagotchi.js";

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('#name');
    let name = nameInput.value;
    
    const typeInput = document.querySelector('#type');
    let type = typeInput.value;

    const container = document.querySelector('#tamagotchi-container');

    const tamagotchi = new TamagotchiGUI(name, type, container);
    
});
