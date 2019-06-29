import { isMobile } from './helper.is-mobile.js';

class AppState {
  constructor() {
    this.tags = localStorage.getItem('tags') ? localStorage.getItem('tags').split(',') : [];
    this.results = new Map();
    this.currentSearch = '';
    this.currentPage = -1;
    this.MAX_PAGES = 6;
    this.searchCount = 0;
    this.isMobile = isMobile();
  }

  isInMaxCount() {
    return this.currentPage < this.MAX_PAGES;
  }

  addPage() {
    this.currentPage += 1;
  }

  resetPage() {
    this.currentPage = -1;
  }

  setPage() {
    this.currentPage = 1;
  }

  showTags() {
    this.tags.forEach(element => {
      const searchHelperBox = document.getElementById('search-helper-id');
      const newDiv = document.createElement('div');
      const newElemText = document.createTextNode(element);
      newDiv.classList.add('search-helper__elem');
      newDiv.appendChild(newElemText);
      newDiv.dataset.movie = element;

      searchHelperBox.insertBefore(newDiv, searchHelperBox.firstChild);
    });
  }

  createTag(tagName) {
    const tagsToLower = this.tags.map(element => element.toLowerCase());
    const tagIterator = tagsToLower.indexOf(tagName.toLowerCase());
    const searchHelperBox = document.getElementById('search-helper-id');

    if (tagIterator !== -1) {
      this.tags.splice(tagIterator, 1);
      this.tags.push(tagName);
      searchHelperBox.childNodes.forEach(node => {
        if (node.dataset.movie.toLowerCase() === tagName.toLowerCase()) {
          node.remove();
        }
      });
    } else {
      this.tags.push(tagName);
    }

    const newDiv = document.createElement('div');
    const newElemText = document.createTextNode(tagName);
    newDiv.classList.add('search-helper__elem');
    newDiv.appendChild(newElemText);
    newDiv.dataset.movie = tagName;

    searchHelperBox.insertBefore(newDiv, searchHelperBox.firstChild);

    this.saveTags();
  }

  saveTags() {
    localStorage.setItem('tags', this.tags);
  }

  saveResult(search, data) {
    this.results.set(search, data);
  }

  saveCurrentSearch(search) {
    this.currentSearch = search;
  }

  removeTag(tagName) {
    this.tags.splice(this.tags.indexOf(tagName), 1);
    this.saveTags();
  }
}

export const appState = new AppState();
appState.showTags();
