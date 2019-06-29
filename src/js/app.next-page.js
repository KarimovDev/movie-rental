import { isInViewport } from './helper.is-in-viewport.js';
import { loadAndShowNextPage } from './app.search-engine.js';
import { appState } from './app.state.js';

let footer;

const setFooter = () => {
  footer = document.querySelector('.footer');
};

export const nextPageEvent = () => {
  if (isInViewport(footer) && appState.currentPage > 0 && appState.isInMaxCount()) {
    window.removeEventListener('resize', nextPageEvent);
    window.removeEventListener('scroll', nextPageEvent);
    loadAndShowNextPage(footer);
  }
};

window.addEventListener('load', setFooter);
window.addEventListener('load', nextPageEvent);
window.addEventListener('resize', nextPageEvent);
window.addEventListener('scroll', nextPageEvent);
