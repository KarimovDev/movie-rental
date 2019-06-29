export const loadAdditInfo = movieData => {
  const urls = movieData.map(element => `/api/?i=${element.imdbID}`);
  makeRequests(urls, 5)
    .then(res => searchAndAddInfo(res))
    .catch(e => console.log(e.message));
};

const makeRequests = (urls, maxRequests) =>
  new Promise((resolve, reject) => {
    const result = [];

    let urlIter = 0;

    let countActive = 0;

    const checkDone = () => {
      countActive -= 1;
      loopPromises();
      if (countActive === 0) {
        resolve(result);
      }
    };

    const startPromises = urlElem => {
      fetch(urlElem)
        .then(response => response.json())
        .then(json => {
          const data = json;

          urls.forEach((item, i) => {
            if (item === urlElem) {
              result[i] = data;
            }
          });
        })
        .then(checkDone);
    };

    const loopPromises = () => {
      while (urlIter < urls.length && countActive < maxRequests) {
        const urlElem = urls[urlIter];
        const isUnique = urls.indexOf(urlElem) === urlIter;

        if (isUnique) {
          startPromises(urlElem);
          countActive += 1;
        }
        urlIter += 1;
      }
    };

    loopPromises();
  });

const searchAndAddInfo = additInfo => {
  additInfo.forEach(element => searchBlock(element));
};

const searchBlock = info => {
  const node = document.querySelector(`#${info.imdbID}`);

  node && addInfo(node, info);
};

const addInfo = (node, info) => {
  const genre = node.querySelector('.elem-genre');
  const rating = node.querySelector('.elem-rating');
  const ratingData = info.imdbRating === 'N/A' ? '' : info.imdbRating;

  genre.textContent = info.Genre;
  rating.textContent = ratingData;

  if (ratingData >= 8) {
    rating.classList.add('elem-rating--5');
  } else if (ratingData >= 6 && ratingData < 8) {
    rating.classList.add('elem-rating--4');
  } else if (ratingData >= 4 && ratingData < 6) {
    rating.classList.add('elem-rating--3');
  } else if (ratingData >= 2 && ratingData < 4) {
    rating.classList.add('elem-rating--2');
  } else if (ratingData > 0 && ratingData < 2) {
    rating.classList.add('elem-rating--1');
  }
};
