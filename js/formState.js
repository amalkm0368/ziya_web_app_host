import { clearAllErrors } from './formValidation.js';
import { toggleSubOptions } from './formUtils.js';

export function setLoadingState(submitBtn, isLoading, text = 'Send Enquiry') {
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  } else {
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = text;
  }
}

export function resetForm(form, categorySelect) {
  form.reset();
  toggleSubOptions(categorySelect?.value);
  clearAllErrors();
}