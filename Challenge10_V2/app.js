"use strict";

const defaultText = "The quick brown fox jumped on the lazy dog";

const textInput = document.querySelector("input[name='text']");
const sizeInput = document.querySelector("input[name='size']");
//Selectionne l'input avec le nom weight
const weightInput = document.querySelector("input[name='weight']");
const lineHeightInput = document.querySelector("input[name='leading']");
const checkBoxInput = document.querySelector("input[name='italic']");
const colorInput = document.querySelector(".colors");
const typoInput = document.querySelector("select");
const output = document.querySelector(".output");
const save = document.querySelector(".save");
const settingsContainer = document.querySelector(".settings-container");

const savedSettings = [];

//Valeurs par défaut, utilisé pour qu'on puisse modifié ces-
//-valeurs à chaque fois pour mettre à jour avec updateOutput.
//Plus simple pour gérer chaque valeur et pour enregistrer les paramètres
let outputBase = {
    text: defaultText,
    italic: "normal",
    lineHeight: "1.5",
    size: "64",
    weight: "400",
    typo: "NeueMontreal",
    background: "#2a2a2a",
    color: "#ffffff",
}

//Met à jour l'output à chaque appel de la fonction
const updateOutput = () => {
    output.value = outputBase.text;
    output.style.fontStyle = outputBase.italic;
    output.style.lineHeight = outputBase.lineHeight;
    output.style.fontSize = outputBase.size;
    output.style.fontWeight = outputBase.weight;
    output.style.fontFamily = outputBase.typo;
    output.style.background = outputBase.background;
    output.style.color = outputBase.color;
}

const truncateString = (string = "", maxLength = 50) =>
    string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

//Change l'output en fonction de l'input
textInput.addEventListener("input", e => {
    if (!e.currentTarget.value) {
        outputBase.text = defaultText;
        updateOutput();
        return;
    }
    outputBase.text = e.currentTarget.value;
    updateOutput();
})

//Change le texte de input en fonction de l'output
output.addEventListener("input", e => {
    textInput.value = e.currentTarget.value;
    outputBase.text = e.currentTarget.value;
})

//Changer la typo
typoInput.addEventListener("input", e => {
    outputBase.typo = e.currentTarget.value;
    updateOutput();
})

//Change la taille
sizeInput.addEventListener("input", e => {
    document.querySelector(".sizelabel").textContent = `${e.currentTarget.value}px`;
    outputBase.size = `${e.currentTarget.value}px`;
    updateOutput();
})

//Change le poid
weightInput.addEventListener("input", e => {
    document.querySelector(".weightLabel").textContent = `${e.currentTarget.value}px`;
    outputBase.weight = `${e.currentTarget.value}`;
    updateOutput();
})

//Change l'interlignage
lineHeightInput.addEventListener("input", e => {
    document.querySelector(".leadinglabel").textContent = `${e.currentTarget.value}px`;
    outputBase.lineHeight = `${e.currentTarget.value}`;
    updateOutput();
})

//Gère l'italique de l'output
checkBoxInput.addEventListener("click", e => {
    if (!e.currentTarget.checked) {
        outputBase.italic = "normal";
    } else {
        outputBase.italic = "italic"
    }
    updateOutput();
})

//Modifie la couleur de l'output par rapport au bouton qu'on appuie
//Faire attention avec currentTarget et target
colorInput.addEventListener("click", e => {
    outputBase.color = e.target.style.color;
    outputBase.background = e.target.style.backgroundColor;
    updateOutput();
})

//Affiche une petite boîtes avec les paramètre, prend en paramètre un tableau-
//-ici savedSettings et donc on itère avec une forEach dedans pour créer une div -
//- et un dataset index pour pouvoir le retrouver par la suite
const displaySettings = (settings) => {
    settingsContainer.innerHTML = "";
    settings.forEach((setting, index) => {
        let truncatedString = truncateString(`${setting.text}`, 20);
        let html = `<div class="setting" data-index=${index} style="background-color:${setting.background}; color:${setting.color}; 
        font-family:${setting.typo}; font-weight: ${setting.weight}; font-style:${setting.italic}">${truncatedString}</div>`;
        settingsContainer.insertAdjacentHTML("beforeEnd", html);
    });

}

//Sauvegarde les paramètres de l'utilisateur
save.addEventListener("click", e => {
    //le ... pour copier le outputBase, sinon tous les settings auraient les mêmes valeurs
    savedSettings.unshift({ ...outputBase });
    displaySettings(savedSettings);
    return savedSettings;
})


//Récupère un setting quand on clique dessu et modifie l'output ainsi que les label à gauche
//Ici ou fais une copie de savedSettings avec l'index de celui qu'on a cliqué et on le met-
//- dans l'objet outputBase ce qui fait que ça modifie directement l'output après avoir-
//- appeler updateOutput()
//Ensuite on met à jour les labels avec outputBase étant donné qu'il contient les savedSettings
settingsContainer.addEventListener("click", e => {
    if (e.target.className == "setting") {
        const index = e.target.dataset.index;
        outputBase = {...savedSettings[index]};
        updateOutput();

        document.querySelector(".leadinglabel").textContent = `${outputBase.lineHeight}`;
        lineHeightInput.value = outputBase.lineHeight;

        document.querySelector(".weightLabel").textContent = `${outputBase.weight}px`;
        weightInput.value = outputBase.weight;

        document.querySelector(".sizelabel").textContent = `${outputBase.size}px`;
        sizeInput.value = outputBase.size;

        typoInput.value = outputBase.typo;
    }
})

