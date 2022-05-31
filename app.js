import {charactersArr} from "./data/data.js";
const copyArray = [...charactersArr];

const gallery = document.querySelector(".main__gallery");
const search = document.getElementById("search-box");
const boxOne = document.getElementById("house-1");
const boxTwo = document.getElementById("house-2");
const boxThree = document.getElementById("house-3");
const boxFour = document.getElementById("house-4");

const boxes = [0, 0, 0, 0];
const houses = ["House Stark", "House Lannister", "House Baratheon", "House Targaryen"];
let searchResults = [];

const showAllCharacters = (array) => {
    array.forEach((character) => {
        gallery.innerHTML += createCard(character);    
    });
}

const createCard = (object) => {
    let character = object;
    return (
        `<div class="card" id="${character.id}">
            <h2 class="card__full-name">${character.fullName}</h2>
            <h3 class="card__title">${character.title}</h3>
            <h4 class="card__family">${character.family}</h4>
            <img src="${character.imageUrl}" alt="${character.image}" class="card__image">
        </div>`
    )
}

const onSearchUpdated = (event) => {
    let searchTerm = event.target.value;
    if (searchTerm === "") {
        searchResults = [];
        clearSearch();
    } else {
        searchResults = filterByText(searchTerm, copyArray);
    }
    displaySearch(searchResults, copyArray);
}

const filterByText = (search, array) => {
    let request = search.toLowerCase();
    let filteredArray = array.filter((character) => {
        return character.fullName.toLowerCase().includes(request)
    });
    return filteredArray;
}

const onCheckboxClicked = (event) => {
    let x = (event.target.id[6] - 1);
    boxes[x] == 0 ? boxes[x] = 1 : boxes[x] = 0;
    displaySearch(searchResults, copyArray);
}

const displaySearch = (searchResults, fullArray) => {
    if (searchResults.length == 0) {
        if (boxes.reduce((a, b) => a + b) == 0) {
            clearSearch();
            return;
        }
        copyArray.forEach((character) => {
            let card = document.getElementById(character.id);
            card.classList.add("card__hidden");
        })
        boxes.forEach((house, index) => {
            if (house != 0) {
                copyArray.forEach((character) => {
                    if (character.family === houses[index]) {
                        let card = document.getElementById(character.id);
                        card.classList.remove("card__hidden");
                    }
                })
            }
        })
    } else {
        fullArray.forEach((character) => {
            let isHidden = true;
            let card = document.getElementById(character.id);
            searchResults.forEach((result) => {
                if (card.id == result.id) {
                    isHidden = false;
                }
            });
            isHidden ? card.classList.add("card__hidden") : card.classList.remove("card__hidden");
            if (boxes.reduce((a, b) => a + b) == 0) {
                return;
            }
            if (! isHidden) {
                boxes.forEach((house, index) => {
                    if (house === 0) {
                        if(character.family === houses[index]) {
                            card.classList.add("card__hidden");
                        }
                    }
                });
            }
        })
    }
}

const clearSearch = () => {
    copyArray.forEach((character) => {
        let card = document.getElementById(character.id);
        card.classList.remove("card__hidden");
    })
}

showAllCharacters(copyArray);

search.addEventListener("input", onSearchUpdated);
boxOne.addEventListener("change", onCheckboxClicked);
boxTwo.addEventListener("change", onCheckboxClicked);
boxThree.addEventListener("change", onCheckboxClicked);
boxFour.addEventListener("change", onCheckboxClicked);