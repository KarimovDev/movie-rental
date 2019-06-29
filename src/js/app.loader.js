import { appState } from './app.state.js';
import { debounce } from './helper.debounce.js';

const searchInputWrap = document.querySelector('.search__form__input-wrap');
const bottomLoader = document.querySelector('.bottom-loader');

const loaderStart = () => {
  if (appState.searchCount !== 0) {
    searchInputWrap.classList.add('search__form__input-wrap--loading');
  }
};

const bottomLoaderStart = () => {
  if (appState.searchCount !== 0) {
    bottomLoader.classList.add('bottom-loader--loading');
  }
};

const loaderStop = () => {
  if (appState.searchCount === 0) {
    searchInputWrap.classList.remove('search__form__input-wrap--loading');
  }
};

export const bottomLoaderStop = () => bottomLoader.classList.remove('bottom-loader--loading');

export const loaderDelayStart = debounce(loaderStart, 200);

export const loaderDelayStop = () =>
  searchInputWrap.addEventListener('animationiteration', loaderStop);

export const bottomLoaderDelayStart = debounce(bottomLoaderStart, 200);

loaderDelayStop();
