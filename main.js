const toDoSearchBtn = document.querySelector('.todo-search-btn');
const toDoInput = document.querySelector('.to-do-input');
const addToDoBtn = document.querySelector('.add-todo-btn');
const checkbox = document.querySelectorAll('.to-do-checkbox');
const responsiveFilterBar = document.querySelector('.filter-wrapper');

// Search button and filter bar resposiveness
window.onresize = window.onload = responsive;

function responsive () {
  const windowWidth = window.innerWidth;
  toDoInput.value = windowWidth;
  if (windowWidth <= 768) {
    responsiveFilterBar.classList.add('btn-group');
    responsiveFilterBar.style.width = '100%';

    toDoSearchBtn.textContent = '';
    const searchIcon = document.createElement('img');
    searchIcon.src = './pictures/search.png';
    searchIcon.alt = 'Search';
    toDoSearchBtn.appendChild(searchIcon);
  } else {
    responsiveFilterBar.classList.remove('btn-group');
    if (toDoSearchBtn.children[0]) {
      toDoSearchBtn.children[0].remove();
      toDoSearchBtn.textContent = 'Search';
    }
  }
}


// Checkbox checked reset upon page load
checkbox.forEach(checkbox => {
  if (checkbox.checked) {
    checkbox.checked = false;
  }
});

// Adding To-Do cards on the grid based on the value of the input
addToDoBtn.addEventListener('click', function () {
  const cardGrid = document.querySelector('.to-do-grid');
  const errorMsg = document.querySelector('.error-msg');
  // Error message should the input be empty
  if (toDoInput.value === '') {
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
                            <input type="checkbox" name="to-do-checkbox" id="to-do-checkbox7" class="to-do-checkbox">
                            <label for="to-do-checkbox7" class="card-body">${toDoInput.value}</label>
                          </div>
                        </div>`;
    newCard.children[0].children[0].children[0].addEventListener('click', cardDeletion);
    cardGrid.appendChild(newCard);

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
});

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
  card.style.transition = 'transform 3s';
  setTimeout(() => {card.parentNode.remove()}, 2000);
}

// Toggling Bootstrap 'active' class on clicked item and untoggling on all other siblings
const filterActive = document.querySelector('.current');
const filterComplete = document.querySelector('.complete');
const filterAll = document.querySelector('.all-todos');

function activateFilterBtn (e) {
  // This returns an object (HTMLcollection) with keys as indexes, and an HTML element as a value
  let children = e.target.parentNode.children;

  // Object.values(nameOfObject) iterates through all values of each key in an object, 
  // and returns, in this case, an HTML element
  Object.values(children).forEach(child => {
    // .classList returns an array called a DOMTokenList. .includes() normally works to search an array since ES6
    // but does not work with DOMTokenList. To check whether a DOMTokenList array contains a specific value,
    // .contains() must be used instead.
    if (child.classList.contains('active')) {
      child.classList.remove('active')
    }
  })
  
  let setActive = e.target.classList;
  if (!(setActive.contains('active'))) {
    setActive.add('active');
  }
};

filterActive.onclick = filterComplete.onclick = filterAll.onclick = activateFilterBtn;