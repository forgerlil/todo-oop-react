const toDoCard = document.querySelectorAll('.to-do-card-wrapper');

toDoCard.forEach(card => {
  card.children[0].children[0].children[0].addEventListener('click', function () {
    if (card.children[0].children[0].children[0].checked) {
      card.children[0].children[0].children[0].checked === false;
    }
    card.remove();
  });
});