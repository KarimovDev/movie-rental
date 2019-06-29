let toTop;

window.addEventListener('load', setToTop);
window.addEventListener('scroll', onScrollToTop);

function setToTop() {
  toTop = document.getElementById('to-top');
  toggleToTopButtonVisibility();
}

window.toTopFunc = function toTopFunc() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

function onScrollToTop() {
  toggleToTopButtonVisibility();
}

function toggleToTopButtonVisibility() {
  if (window.pageYOffset <= 500) {
    toTop.classList.remove('to-top--isVisible');
    toTop.style.visibility = 'hidden';
  } else if (window.pageYOffset > 500) {
    toTop.style.visibility = 'visible';
    toTop.classList.add('to-top--isVisible');
  }
}
