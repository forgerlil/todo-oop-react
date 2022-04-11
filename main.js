const toDoInput = document.querySelector('.to-do-input');
const addToDoBtn = document.querySelector('.add-todo-btn');
const checkbox = document.querySelectorAll('.to-do-checkbox');
let idIncrementalCounter = 6;

// Checkbox checked reset upon page load
checkbox.forEach(checkbox => {
  if (checkbox.checked) {
    checkbox.checked = false;
  }
});

// Detection of mouse clicks/enter keys for the input and button to add in a new to-do
addToDoBtn.addEventListener('click', addCard);
addToDoBtn.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addCard();
  }
});

toDoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addCard();
  }
});

// Adding To-Do cards on the grid based on the value of the input
function addCard () {
  const cardGrid = document.querySelector('.to-do-grid');
  const errorMsg = document.querySelector('.error-msg');
  // Error message should the input be empty
  if (toDoInput.value === '') {
    // Resetting any previous error messages for no duplicate error messages
    if (errorMsg.children[0]) {
      toDoInput.style.border = '2px solid transparent';
      const removeError = errorMsg.children[0];
      removeError.remove();
    }
    toDoInput.style.border = '2px solid red';
    let errorText = document.createElement('p');
    errorText.textContent = 'Please add text for your to-do';
    errorText.style.color = 'red';
    errorMsg.appendChild(errorText);
  } else {
    // If input is not empty, add the value of the input to a new card and append to the end of the grid
    let newCard = document.createElement('div');
    newCard.setAttribute('class', 'to-do-card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 mb-4');
    newCard.innerHTML = `<div class="card to-do-card px-2 py-1" id="card1">
                          <div class="card-body">
                            <input type="checkbox" name="to-do-checkbox" class="to-do-checkbox">
                            <label class="card-body">${toDoInput.value}</label>
                          </div>
                        </div>`;
    const checkboxChild = newCard.children[0].children[0].children[0]
    const labelChild = newCard.children[0].children[0].children[1]
    checkboxChild.id  = `to-do-checkbox${idIncrementalCounter++}`;
    labelChild.for  = `to-do-checkbox${idIncrementalCounter++}`;
    checkboxChild.addEventListener('click', cardDeletion);
    cardGrid.appendChild(newCard);
    toDoInput.value = '';

    /* previous version of card creation
    let newCard = document.createElement('div');
    let cardChild0 = document.createElement('div');
    let cardGrandChild0 = document.createElement('div');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');

    newCard.setAttribute('class', 'to-do-card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 mb-4');
    cardChild0.setAttribute('class', 'card to-do-card px-2 py-1');
    cardGrandChild0.setAttribute('class', 'card-body');
    checkbox.setAttribute('class', 'to-do-checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'to-do-checkbox');
    checkbox.addEventListener('click', function () {
      newCard.remove();
    });
    label.setAttribute('class', 'card-body');
    label.setAttribute('for', 'to-do-checkbox');
    label.textContent = toDoInput.value;

    cardGrandChild0.appendChild(checkbox);
    cardGrandChild0.appendChild(label);
    cardChild0.appendChild(cardGrandChild0);
    newCard.appendChild(cardChild0);
    cardGrid.appendChild(newCard);
    */

    //Reset error message if input was given
    if (errorMsg.children) {
      toDoInput.style.border = '2px solid transparent';
      const removeError = errorMsg.children[0];
      removeError.remove();
    }
  }
};

// Adding Event listener to each checkbox for every to-do already in screen
const toDoCard = document.querySelectorAll('.to-do-card-wrapper');

toDoCard.forEach(card => {
  card.children[0].children[0].children[0].addEventListener('click', cardDeletion);
    /*card.children[0].children[0].children[0].remove();
    card.children[0].children[0].children[0].innerHTML = "Done!";
    card.children[0].style.backgroundColor = '#198754';
    card.children[0].children[0].children[0].style.textAlign = 'center';
    card.children[0].style.transform = 'scale(.95, .95)';
    card.children[0].style.transition = 'transform 3s' 
    setTimeout(() => {card.remove()}, 2000);

    //ask Martin why it only works when async */
});

// Function to delete a card upon checking the checkbox, with animation and a "Done" message
function cardDeletion (event) {
  const card = event.target.parentNode.parentNode;
  event.target.nextElementSibling.innerHTML = "Done!";
  card.style.backgroundColor = '#198754';
  card.style.textAlign = 'center';
  card.style.transform = 'scale(.95, .95)';
  card.style.transition = 'all ease .75s';
  setTimeout(() => {card.parentNode.remove()}, 1250);
}

/*
let rootMessages = document.querySelector('.messages');

rootMessages.onclick = function (e) {
  let timeStamp = e.target.getAttribute('data-date');
  if (timeStamp) {
    alert(timeStamp)
  }
}
*/


// WORK IN PROGRESS, 06.04.2022
// !!!Ask how to reach the btn-success class

const filterActive = document.querySelector('.active');
const filterComplete = document.querySelector('.complete');
const filterAll = document.querySelector('.all-todos');

function activateActive () {
  //filterActive.style.backgroundColor = '#198754';
  //filterActive.style.color = '#FFF';
  console.log(filterActive.getAttribute('class'))
  if (filterActive.getAttribute('class', 'btn filter-btn active btn-success') === false) {
    filterActive.addAttribute('class', 'btn-success');
  }
};

function activateComplete () {};

function activateAll () {};

filterActive.onclick = activateActive;
filterComplete.onclick = activateComplete;
filterAll.onclick = activateAll;

//HTML/MDN classlist (object/element)
