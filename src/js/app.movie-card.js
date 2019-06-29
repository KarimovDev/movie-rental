const movieTemplate = document.createElement('template');
movieTemplate.innerHTML = `
<div class="film-box-elem">
<img
  class="film-box-elem__img"
  onload="imgLoaded(this)"
/>
<a class="elem-link">
<div class="film-box-elem__wrap">
  <div class="elem-grad"></div>
  <div class="elem-upline elem-upline--loaded"></div>
  <div class="elem-downline elem-downline--loaded"></div>
  <div class="elem-text-wrap">
    <p class="elem-rating"></p>
    <p class="elem-text"></p>
  </div>
  <p class="elem-genre"></p>
  <p class="elem-year">2019</p>
</div>
</a>
</div>`;

export const render = movieData => {
  const movie = movieTemplate.content.cloneNode(true);

  const link = movie.querySelector('.elem-link');
  const title = movie.querySelector('.elem-text');
  const poster = movie.querySelector('.film-box-elem__img');
  const year = movie.querySelector('.elem-year');
  const movieWrap = movie.querySelector('.film-box-elem');

  const imdbID = movieData.imdbID.replace(/\s/g, '');

  title.textContent = movieData.Title;
  year.textContent = movieData.Year;
  link.href = `https://www.imdb.com/title/${imdbID}/`;
  poster.dataset.src = movieData.Poster;
  movieWrap.id = imdbID;

  if (movieData.Poster === 'N/A') {
    poster.classList.add('film-box-elem__img--loading');
  }

  return movie;
};
