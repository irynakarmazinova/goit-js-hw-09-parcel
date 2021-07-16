import galleryItems from './app.js';

export const gallery = () => {
  const refs = {
    ulJsEl: document.querySelector('.js-gallery'),
    // ulEl: document.querySelector('.gallery'),
    liEl: document.querySelector('.gallery__item'),
    // aEl: document.querySelector('gallery__link'),
    // divLightboxEl: document.querySelector('lightbox'),
    divJSLightboxEl: document.querySelector('.js-lightbox'),
    closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  };

  // глобальные переменные
  const modalImageEl = refs.divJSLightboxEl.querySelector('.lightbox__image');
  let modalIsOpen = false;
  let imageCardNextSibling = null;

  // функция добавления/создания разметки
  function createGalleryItems(items) {
    return items.reduce((acc, { preview, original, description }) => {
      acc = `${acc} <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
    class="gallery__image"
    loading="lazy"
    data-src="${preview}"
    data-source="${original}"
    alt="${description}"
    width="390px"
    higth="240px"
    />
    </a>
    </li>
    `;
      return acc;
    }, '');
  }
  refs.ulJsEl.insertAdjacentHTML('beforeend', createGalleryItems(galleryItems));

  //  функция делегирования addEventListener на ul
  function onImageClick(e) {
    // когда кликаешь на img, отменить по умолчанию перезагрузку страницы
    // превент действует только на событии(event/e)
    e.preventDefault(); //

    if (!e.target.classList.contains('gallery__image')) {
      return;
    }

    // console.log({ h: e.target });

    openModalWindow(e.target);
  }
  refs.ulJsEl.addEventListener('click', onImageClick);

  // функция открытия модального окна - при клике на img добавлять класс is-open и открывать модальное окно
  function openModalWindow(target) {
    modalIsOpen = true;

    // при открытии модального окна внести данные в src and alt
    const { source } = target.dataset;
    const gallery = target.closest('.gallery');

    imageCardNextSibling = gallery.nextElementSibling;
    imageCardNextSibling.classList.add('is-open');
    // console.log(imageCardNextSibling);

    modalImageEl.src = source;
    modalImageEl.alt = target.alt;
  }

  // функция закрытия модального окна - при клике по closeBtn(крестик в модалке) закрыть модальное окно
  function closeModalWindow() {
    if (modalIsOpen) {
      imageCardNextSibling.classList.remove('is-open');
      modalImageEl.src = '';
      modalImageEl.alt = '';

      modalIsOpen = false;
    }
  }
  refs.closeBtn.addEventListener('click', closeModalWindow);

  //функция закрытия модального окна - при клике по оверлею
  function clickToOverlay(e) {
    if (e.target.classList.contains('lightbox__overlay')) {
      closeModalWindow();
    }
  }
  document.addEventListener('click', clickToOverlay);

  // функция закрытия модального окна - при клике по клавише ESC
  function keydownToEsc(e) {
    if (e.keyCode === 27) {
      closeModalWindow();
    }
  }
  window.addEventListener('keydown', keydownToEsc);

  // функция пролистывания галереи - при клике по клавише ArrowRight и ArrowLeft
  function keydownToArrowRightAndLeft(e) {
    const clickToLeftArrow = e.keyCode === 37;
    const clickToRightArrow = e.keyCode === 39;

    if (modalIsOpen && (clickToLeftArrow || clickToRightArrow)) {
      const { src } = modalImageEl;
      const foundIndex = galleryItems.findIndex(item => item.original === src);
      let item = null;

      if (foundIndex === 0 && clickToLeftArrow) {
        item = galleryItems[galleryItems.length - 1];
      } else if (foundIndex === galleryItems.length - 1 && clickToRightArrow) {
        item = galleryItems[0];
      } else if (clickToLeftArrow) {
        item = galleryItems[foundIndex - 1];
      } else {
        item = galleryItems[foundIndex + 1];
      }

      if (item) {
        modalImageEl.src = item.original;
        modalImageEl.alt = item.description;
      }
    }
  }
  window.addEventListener('keydown', keydownToArrowRightAndLeft);

  // функция lazyload с поддержкой нативной и библиотеки
  function addSrcAttrToLazyImages() {
    // attr - attribute
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    // ленивая загрузка - проверка загружаемости картинок
    lazyImages.forEach(image => image.addEventListener('load', onImageLoaded, { once: true }));
    function onImageLoaded(e) {
      console.log('Картинка загрузилась');
    }

    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
  function addLazySizesScript() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity =
      'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossorigin = 'anonymous';
    script.referrerpolicy = 'no-referrer';

    document.body.appendChild(script);
  }
  // feature detection js(выявление возможностей браузера)
  if ('loading' in HTMLImageElement.prototype) {
    console.log('Браузер поддерживает lazyload');
    addSrcAttrToLazyImages();
  } else {
    console.log('Браузер НЕ поддерживает lazyload');
    addLazySizesScript();
  }
};
// ------------------------------------------------------------------------
// второй вариант решения - от Димы ментора
// const refs = {
//   gallery: document.querySelector('.gallery'),
//   modal: document.querySelector('.js-lightbox'),
//   modalImg: document.querySelector('.lightbox__image'),
//   closeBtn: document.querySelector('[data-action=close-lightbox]'),
// };

// let activeIndex = 0;

// const makeGalleryMarkup = ({
//   preview,
//   original,
//   description,
// }) => `<li class="gallery__item">
//   <a
//     class="gallery__link"
//     href='${original}'
//   >
//     <img
//       class="gallery__image"
//       src='${preview}'
//       data-source='${original}'
//       alt='${description}'
//     />
//   </a>
// </li>`;

// const markup = galleryItems.map(makeGalleryMarkup);

// refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));

// function onOpenModal(e) {
//   e.preventDefault();

//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }

//   markup.forEach((el, index) => {
//     if (el.includes(e.target.src)) {
//       activeIndex = index;
//     }
//   });
//   console.log(activeIndex);

//   window.addEventListener('keydown', keyboardManipulation);

//   refs.modal.classList.add('is-open');
//   refs.modalImg.src = e.target.dataset.source;
//   refs.modalImg.alt = e.target.alt;
// }
// refs.gallery.addEventListener('click', onOpenModal);

// function closeModal() {
//   refs.modal.classList.remove('is-open');

//   window.removeEventListener('keydown', keyboardManipulation);

//   refs.modalImg.src = '#';
//   refs.modalImg.alt = '';
// }

// function onModalClose(e) {
//   if (e.target.nodeName === 'IMG') {
//     return;
//   }
//   closeModal();
// }
// refs.modal.addEventListener('click', onModalClose);

// function keyboardManipulation({ key }) {
//   switch (key) {
//     case galleryItems.length - 1 > activeIndex && 'ArrowRight':
//       activeIndex += 1;
//       refs.modalImg.src = galleryItems[activeIndex].original;
//       break;

//     case activeIndex > 0 && 'ArrowLeft':
//       activeIndex -= 1;
//       refs.modalImg.src = galleryItems[activeIndex].original;
//       break;

//     case activeIndex === galleryItems.length - 1 && 'ArrowRight':
//       activeIndex = 0;
//       refs.modalImg.src = galleryItems[activeIndex].original;
//       break;

//     case activeIndex === 0 && 'ArrowLeft':
//       activeIndex = galleryItems.length - 1;
//       refs.modalImg.src = galleryItems[activeIndex].original;
//       break;

//     case 'Escape':
//       closeModal();
//       break;

//     default:
//       alert('что-то пошло не так');
//   }
// }
