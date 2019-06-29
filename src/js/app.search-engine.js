import { render } from './app.movie-card.js';
import { setLazy, lazyLoad } from './app.lazy-loader.js';
import { clearNode } from './helper.clear-node.js';
import { showCount } from './app.show-count.js';
import { appState } from './app.state.js';
import { loaderDelayStart, bottomLoaderDelayStart, bottomLoaderStop } from './app.loader.js';
import { loadAdditInfo } from './app.load-addit-info.js';
import { nextPageEvent } from './app.next-page.js';

const resultsContainer = document.querySelector('.film-box');

export const searchAndShowResults = (input, signal) => {
  let count = 0;
  let results = [];
  let error = false;

  const search = async (input, signal) => {
    try {
      loaderDelayStart();
      appState.saveCurrentSearch(input.toLowerCase());
      appState.searchCount += 1;
      let data = appState.results.get(input.toLowerCase());
      if (!data) {
        data = await fetch(`/api/?type=movie&s=${input}`, {
          signal,
        }).then(r => r.json());
        data.Response === 'True' && appState.saveResult(input.toLowerCase(), data);
      }

      if (data.Response === 'True') {
        count = data.totalResults;
        results = data.Search;
        appState.setPage();
      } else {
        appState.saveCurrentSearch('');
        error = data.Error;
        console.log(error);
        appState.resetPage();
      }
      const movies = results.map(result => render(result));
      clearNode(resultsContainer);
      showResults(movies);
      loadAdditInfo(results);
      showCount(count);
      setLazy();
      lazyLoad();
      appState.searchCount -= 1;
    } catch (e) {
      appState.searchCount -= 1;
      clearNode(resultsContainer);
      appState.resetPage();
      appState.saveCurrentSearch('');
      showCount(-1);
      error = e;
      console.log(error.message);
    }
  };

  appState.currentSearch !== input.toLowerCase() && search(input, signal);
};

const showResults = movies => {
  const fragment = document.createDocumentFragment();

  movies.forEach(movie => fragment.appendChild(movie));
  resultsContainer.appendChild(fragment);
};

export const loadAndShowNextPage = () => {
  let results = [];
  let error = false;

  const search = async () => {
    try {
      appState.searchCount += 1;
      appState.addPage();
      bottomLoaderDelayStart();
      const data = await fetch(
        `/api/?type=movie&s=${appState.currentSearch}&page=${appState.currentPage}`,
        {},
      ).then(r => r.json());

      if (data.Response === 'True') {
        results = data.Search;
      } else {
        appState.resetPage();
        error = data.Error;
        console.log(error);
      }
      const movies = results.map(result => render(result));
      showResults(movies);
      loadAdditInfo(results);
      bottomLoaderStop();
      setLazy();
      lazyLoad();
      appState.searchCount -= 1;
    } catch (e) {
      appState.searchCount -= 1;
      appState.resetPage();
      bottomLoaderStop();
      error = e;
      console.log(error.message);
    }
    window.addEventListener('resize', nextPageEvent);
    window.addEventListener('scroll', nextPageEvent);
  };

  search();
};
