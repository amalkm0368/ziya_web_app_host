import { addToastStyles } from './toastStyles.js';

export function showToast(message, type = 'success') {
  addToastStyles(); // Ensure styles are loaded
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    className: `toast-${type}`,
    stopOnFocus: true
  }).showToast();
}

export { addToastStyles };