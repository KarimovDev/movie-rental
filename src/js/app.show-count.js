export const showCount = count => {
  const resultStringWrapper = document.getElementById('search-info-id');
  const resultString = resultStringWrapper.querySelector('.search-info__elem__text');

  if (count === 0) {
    resultString.textContent = `Мы не поняли о чем речь ¯\\_(ツ)_/¯`;
  } else if (count > 0) {
    const dMovies = getDeclension('фильм', 'фильма', 'фильмов');
    resultString.textContent = `Нашли ${count} ${dMovies(count)}`;
  } else if (count === -1) {
    resultString.textContent = `Во время получения данных возникла ошибка`;
  }
};

const getDeclension = (one, two, five) => count => {
  count %= 100;
  if (count >= 5 && count <= 20) {
    return five;
  }

  count %= 10;
  if (count === 1) {
    return one;
  }

  if (count >= 2 && count <= 4) {
    return two;
  }

  return five;
};
