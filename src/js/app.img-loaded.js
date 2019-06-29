import { appState } from './app.state.js';

window.imgLoaded = function imgLoaded(img) {
  const imgWrapper = img.parentNode;
  const filmBoxWrap = imgWrapper.querySelector('.film-box-elem__wrap');
  const gradient = filmBoxWrap.querySelector('.elem-grad');
  const title = filmBoxWrap.querySelector('.elem-text');
  const rating = filmBoxWrap.querySelector('.elem-rating');

  if (appState.isMobile) {
    gradient.classList.add('elem-grad--hovered');
    filmBoxWrap.classList.add('film-box-elem__wrap--hovered');
  } else {
    filmBoxWrap.classList.add('film-box-elem__wrap--loaded');
  }

  img.classList.add('img-loaded');
  title.classList.add('elem-text--elem-loaded');
  rating.classList.add('elem-rating--elem-loaded');
};
