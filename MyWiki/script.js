console.log('script starts');



// showing all the cards at start
let allCards = document.querySelectorAll('.card');
let h;
for (h = 0; h < allCards.length; h++) {
    allCards[h].classList.add('accepted');
}

// showing all cards when clicking on logo
let logo = document.getElementById('logo');
logo.addEventListener('click', acceptAllCards);

function acceptAllCards() {
    let h;
    for (h = 0; h < allCards.length; h++) {
        allCards[h].classList.add('accepted');
    }
}







// Nav Hiding

var nav_mainCategorys = document.querySelectorAll('.navMainCategory');

// Hiding all
var z;
for (z = 0; z < document.querySelectorAll('.navDropdown').length; z++) {
    document.querySelectorAll('.navDropdown')[z].style.display = 'none';
};


// Showing the dropdown
// giving all topics the eventlistner 
var i;
var x;
for (i = 0; i < nav_mainCategorys.length; i++) {
    nav_mainCategorys[i].addEventListener('click', show_children);
}

let selected;
let filteredCategoris = [];
let k;
let clearSource;
let sameSelected;
let selectedParent;
let parents = [];
function show_children(event) {
    // Removing old selected Categorys
    let acceptedCards = document.querySelectorAll('.accepted');
    let v;
    for (v = 0; v < acceptedCards.length; v++) {
        acceptedCards[v].classList.remove('accepted');
    }
    acceptedCards = document.querySelectorAll('.accepted');



    // Showing the dropdowns
    for (i = 0; i < event.target.children.length; i++) {
        event.target.children[i].style.display = 'block';
        event.target.children[i].addEventListener('click', show_children);
    }
    // Definying whats selected and hightlighting it
    if (selected === undefined) {
        selected = event.target;
        selected.classList.add('selected');
    } else if (selected !== event.target) {
        selected.classList.remove('selected');
        selected = event.target;
        selected.classList.add('selected');
    }



    // Cutting the string into words
    let selectedStr = selected.innerHTML.split('>')[0].split('<')[0];
    // Removing the white spaces from the string
    selectedStr = selectedStr.trim().toUpperCase();

    // Counting how many "steps" to the mainParent
    let navElement = document.getElementsByTagName('nav');
    g = 0;
    selectedParent = selected;
    while (selectedParent !== navElement[0]) {
        g++
        selectedParent = selectedParent.parentElement
    }
    sameSelected = selected;
    let parents = [];
    selectedParent = selected;
    // Unshifting (adding from behind) every next parent
    for (g; g > 0; g--) {
        parents.unshift(selectedParent.innerHTML.split('>')[0].split('<')[0].trim().toUpperCase())
        selectedParent = selectedParent.parentElement;
    }
    // Joining the array
    parentsStr = parents.join('/');
    clearSource = parentsStr;


    // getting all the cards Source codes
    let cardSource = document.querySelectorAll('.cardSource');


    // checking if the cards source name includes the category name
    let cardSourceText;
    let o;
    for (o = 0; o < cardSource.length; o++) {
        cardSourceText = cardSource[o].innerHTML.toUpperCase();
        if (cardSourceText.indexOf(clearSource) > -1) {
        
            filteredCategoris[o] = cardSource[o].parentElement;
        } 
    }

    // Giving accepted cards the special class accepted
    for (k = 0; k < filteredCategoris.length; k++) {
        if (filteredCategoris[k] !== undefined) {
            filteredCategoris[k].classList.add('accepted');
        }
    }
    filteredCategoris = [];
}





// SEARCHING

// Findings Element of input
let search = document.getElementById('search');
// Giving it an EventListener on typing every letter
search.addEventListener('keyup', filterCards);

let q = 0;
// Function after the letter is typed
function filterCards() {
    let filterValue = search.value.toUpperCase();




    let cardNames = document.querySelectorAll('.cardTitel');
    let cardTags = document.querySelectorAll('.cardTags');
    let cardText = document.querySelectorAll('.cardText');

    var y;
    for (y = 0; y < cardNames.length; y++) {
        
        // Deleting all marks
        if(cardText[y].innerHTML.indexOf('<mark>') > -1 || cardText[y].innerHTML.indexOf('</mark>') > -1) {
            while(cardText[y].innerHTML.indexOf('<mark>') > -1 || cardText[y].innerHTML.indexOf('</mark>') > -1) {


                let fullOriginalStr = cardText[y].innerHTML;
                let beginningOriginalStr = fullOriginalStr.slice(0, cardText[y].innerHTML.indexOf('<mark>'));
                let highlightedOriginalStr = fullOriginalStr.slice(cardText[y].innerHTML.indexOf('<mark>') + 6, cardText[y].innerHTML.indexOf('</mark>'));
                let endingOriginalStr = fullOriginalStr.slice(cardText[y].innerHTML.indexOf('</mark>') + 7, fullOriginalStr.length);
                let newStr = beginningOriginalStr + highlightedOriginalStr + endingOriginalStr;
                cardText[y].innerHTML = newStr;

            }
        }

        // checking if the search value is included in the text
        if (cardNames[y].innerHTML.toUpperCase().includes(filterValue) === true || cardTags[y].innerHTML.toUpperCase().indexOf(filterValue) > -1 || cardText[y].innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            cardNames[y].parentElement.style.display = '';

            // Determine where is the text found (tittle, tags or text)
            if (cardText[y].innerHTML.toUpperCase().indexOf(filterValue) > -1) {
                cardText[y].parentElement.style.backgroundColor = 'pink';
            };
            if (cardTags[y].innerHTML.toUpperCase().indexOf(filterValue) > -1) {
                cardText[y].parentElement.style.backgroundColor = 'violet';
            };
            if (cardNames[y].innerHTML.toUpperCase().indexOf(filterValue) > -1) {
                cardText[y].parentElement.style.backgroundColor = 'Lightgreen';
            };
            

            // HIGHLIGHTING

            // finding the positions where there is a match
            if(cardText[y].innerText.toUpperCase().indexOf(filterValue) > -1 && filterValue !== '') {
                let beginSearch = -1;
                let foundPositions = []                    
        
                while(cardText[y].innerHTML.toUpperCase().indexOf(filterValue, beginSearch) > -1) {
                    let foundPosition = cardText[y].innerHTML.toUpperCase().indexOf(filterValue, beginSearch);
                    foundPositions.push(foundPosition);
        
                    beginSearch = foundPosition + 1;
                }

                // Creating new string with inserted mark's tags
                let l;
                let correctionCauseMarks = 0;
                for(l = 0; l < foundPositions.length; l++) {
        
                    let fullOriginalStr = cardText[y].innerHTML;
                    let beginningOriginalStr = fullOriginalStr.slice(0, foundPositions[l] + correctionCauseMarks);
                    let highlightedOriginalStr = fullOriginalStr.slice(foundPositions[l] + correctionCauseMarks, foundPositions[l] + correctionCauseMarks + filterValue.length);
                    let endingOriginalStr = fullOriginalStr.slice(foundPositions[l] + correctionCauseMarks + filterValue.length, fullOriginalStr.length);
                    let newStr = beginningOriginalStr + '<mark>' + highlightedOriginalStr + '</mark>' + endingOriginalStr;
                    cardText[y].innerHTML = newStr;

                    correctionCauseMarks = correctionCauseMarks + 13;
                }
            }


            // hiding all cards where there is no match
        }   else {
            cardNames[y].parentElement.style.display = 'none';
            cardText[y].parentElement.style.backgroundColor = 'red';
        }
    }

}




