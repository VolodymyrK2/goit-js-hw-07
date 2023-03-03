import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryBoxEl = document.querySelector('.gallery');
galleryBoxEl.insertAdjacentHTML('afterbegin', createGalleryItemsMarkup(galleryItems));
galleryBoxEl.addEventListener('click', onGalleryItemsClick);

function createGalleryItemsMarkup(imgItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    }).join('');
}
function onGalleryItemsClick(event) {
    if (!event.target.classList.contains('gallery__image') )
     {
        return;
    }
    event.preventDefault();
  const url = event.target.dataset.source;
  onOpenModal(url);
}

function onOpenModal(url) {
  if (url === undefined) {
    return;
  }
  const instance = basicLightbox.create(`
    <img src='${url}', width="800" height="600">`, {
    onShow: (instance) => window.addEventListener('keydown', onEscKeyPress),
        
    onClose: (instanse) => window.removeEventListener('keydown', onEscKeyPress),
  });
  instance.show();
  function onEscKeyPress(event) {
    if (event.code == 'Escape') {
      instance.close();
    }
  }
}
