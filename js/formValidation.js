import { showToast } from './toastUtils.js';

export function validateField(e) {
  const field = e.target;
  const fieldId = field.id;
  const value = field.value.trim();

  clearError(fieldId);

  if (field.required && !value) {
    showError(fieldId, 'This field is required');
    return false;
  }

  if (fieldId === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError(fieldId, 'Please enter a valid email address');
    return false;
  }

  if (fieldId === 'phone' && value && !/^[0-9]{10}$/.test(value)) {
    showError(fieldId, 'Phone number must be 10 digits');
    return false;
  }

  return true;
}

export function validateForm() {
  let isValid = true;
  clearAllErrors();

  ['name', 'email', 'phone', 'category'].forEach(field => {
    const element = document.getElementById(field);
    if (element && element.required && !element.value.trim()) {
      showError(field, 'This field is required');
      isValid = false;
    }
  });

  const name = document.getElementById('name');
  if (name && !/^[a-zA-Z\s]+$/.test(name.value.trim())) {
    showError('name', 'Please enter Your Name');
    isValid = false;
  }

  const email = document.getElementById('email');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  const phone = document.getElementById('phone');
  if (phone && !/^[0-9]{10}$/.test(phone.value.trim())) {
    showError('phone', 'Phone number must be 10 digits');
    isValid = false;
  }

  const category = document.getElementById('category')?.value;
  if (category === 'school') {
    const schoolClass = document.getElementById('school_class');
    if (schoolClass && !schoolClass.value) {
      showError('school_class', 'Please select your class/grade');
      isValid = false;
    }
  } else if (category === 'internship') {
    const internship = document.getElementById('internship');
    if (internship && !internship.value) {
      showError('internship', 'Please select an internship program');
      isValid = false;
    }

    const termsAccepted = document.getElementById('termsCheckbox');
    if (termsAccepted && !termsAccepted.checked) {
      showError('termsAccepted', 'You must accept the terms and conditions');
      showToast(
        "You must accept the terms and conditions to apply for internships",
        'error'
      );
      isValid = false;
    }
  } else if (category === 'it_services') {
    const itService = document.getElementById('it_service');
    if (itService && !itService.value) {
      showError('it_service', 'Please select an IT service');
      isValid = false;
    }
  }

  return isValid;
}

export function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement && inputElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.classList.add('error');
  }
}

export function clearError(fieldId) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement && inputElement) {
    errorElement.style.display = 'none';
    inputElement.classList.remove('error');
  }
}

export function clearAllErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.style.display = 'none';
  });
  document.querySelectorAll('.error').forEach(el => {
    el.classList.remove('error');
  });
}