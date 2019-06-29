import { isInViewport } from './helper.is-in-viewport.js';

let img = [];

window.addEventListener('resize', lazyLoad);
window.addEventListener('scroll', lazyLoad);

export function setLazy() {
  img = Array.prototype.filter.call(
    document.getElementsByClassName('film-box-elem__img'),
    el => el.dataset.src,
  );
}

export function lazyLoad() {
  for (let i = 0; i < img.length; i++) {
    if (isInViewport(img[i])) {
      if (img[i].getAttribute('data-src') && img[i].getAttribute('data-src') !== 'N/A') {
        img[i].src = img[i].getAttribute('data-src');
      }
      img[i].removeAttribute('data-src');
    }
  }

  cleanLazy();
}

function cleanLazy() {
  img = Array.prototype.filter.call(img, el => el.getAttribute('data-src'));
}
