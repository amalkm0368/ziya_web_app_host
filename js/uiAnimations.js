export function animateForm(formElement) {
  formElement.style.opacity = '0';
  formElement.style.transform = 'translateY(20px)';
  setTimeout(() => {
    formElement.style.transition = 'all 0.5s ease-out';
    formElement.style.opacity = '1';
    formElement.style.transform = 'translateY(0)';
  }, 100);
}