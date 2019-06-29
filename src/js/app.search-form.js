import { searchAndShowResults } from './app.search-engine.js';
import { clearNode } from './helper.clear-node.js';
import { debounce } from './helper.debounce.js';
import { appState } from './app.state.js';

let formBox;
let formBoxSourceBottom;
let resultsContainer;
let searchHelper;
const searchAndShowDebounce = debounce(searchAndShowResults, 700);
let controller;

window.addEventListener('load', setFormBox);
window.addEventListener('scroll', onScrollSearchForm);

function setFormBox() {
  formBox = document.getElementById('form-box');
  formBoxSourceBottom = formBox.getBoundingClientRect().bottom + window.pageYOffset;
  resultsContainer = document.querySelector('.film-box');
  searchHelper = document.getElementById('search-helper-id');
  searchHelper.addEventListener('click', onClickHelper);
}

window.onFocusFunc = function onFocusFunc(input) {
  formBox.classList.add('search__form--focused');
  document.getElementById('search-helper-id').classList.add('search-helper--visible');
  document.getElementById('search-helper-id').classList.add('search-helper--focused');
};

function onScrollSearchForm() {
  const isScrollableFormBox = formBox && formBox.classList.contains('search__form--focused');
  if (!isScrollableFormBox) {
    return;
  }

  const isScrolledUp =
    formBox.classList.contains('search__form--scrolled') &&
    window.pageYOffset < formBoxSourceBottom;
  const isScrolledDown = window.pageYOffset > formBoxSourceBottom;

  if (isScrolledUp) {
    formBox.classList.remove('search__form--scrolled');
  } else if (isScrolledDown) {
    formBox.classList.add('search__form--scrolled');
  }
}

window.onInputFunc = function onInputFunc(input) {
  hideElementsIfEmptyInput(input.value);
  if (input.value.length === 0) {
    controller.abort();
  }
  if (input.value.length > 0) {
    controller = new AbortController();
    searchAndShowDebounce(input.value, controller.signal);
  }
};

window.onSubmitFunc = function onSubmitFunc() {
  const searchValue = document.getElementById('search').value;
  if (searchValue.length === 0) {
    return false;
  }
  hideElementsIfEmptyInput(searchValue);
  controller = new AbortController();
  searchAndShowResults(searchValue, controller.signal);
  appState.createTag(searchValue);
  return false;
};

window.onClickReset = function onClickReset() {
  const resultString = document.querySelector('.search-info__elem__text');

  resultString.textContent = '';
  hideElementsIfEmptyInput('');
  controller.abort();
  clearNode(resultsContainer);
  appState.saveCurrentSearch('');
  appState.resetPage();
};

function hideElementsIfEmptyInput(value) {
  if (value === '') {
    document.getElementById('reset').style.display = 'none';
  } else {
    document.getElementById('reset').style.display = 'block';
  }
}

window.onClickHelper = function onClickHelper(event) {
  if (event.target.classList.contains('search-helper__elem') && !event.altKey) {
    const movieName = event.target.dataset.movie;
    document.getElementById('search').value = movieName;
    hideElementsIfEmptyInput(movieName);
    controller = new AbortController();
    searchAndShowResults(movieName, controller.signal);
    appState.createTag(movieName);
  } else if (event.target.classList.contains('search-helper__elem') && event.altKey) {
    const movieName = event.target.dataset.movie;
    event.target.remove();
    appState.removeTag(movieName);
  }
};
