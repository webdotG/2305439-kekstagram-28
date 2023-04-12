import { isEscapeKey } from './utils.js';

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

const getTypeMessage = () => document.querySelector('.success, .error');

const closeModal = () => {
  const message = getTypeMessage();
  if (message) {
    message.remove();
  }

  document.removeEventListener('keydown', onModalEscKeydown);
  document.removeEventListener('click', onModalOutsideClick);
};

const openSuccessModal = () => {
  const success = successModalTemplate.cloneNode(true);
  document.body.appendChild(success);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    closeModal();
  });

  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onModalOutsideClick);
};

const openErrorModal = () => {
  const error = errorModalTemplate.cloneNode(true);
  document.body.appendChild(error);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    closeModal();
  });

  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onModalOutsideClick);
};

function onModalEscKeydown (evt) {
  if (isEscapeKey() && getTypeMessage()) {
    evt.preventDefault();
    closeModal();
  }
}

function onModalOutsideClick (evt) {
  const type = getTypeMessage();
  if (isEscapeKey() && evt.target === type) {
    closeModal();
  }
}

export { getTypeMessage, openSuccessModal, openErrorModal };
