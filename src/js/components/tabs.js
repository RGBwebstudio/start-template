window.addEventListener('DOMContentLoaded', function () {
  let tab = document.querySelectorAll('.tabs__item'),
    header = document.querySelector('.tabs'),
    tabContent = document.querySelectorAll('.tabs__content');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  header.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('tabs__item')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
});
