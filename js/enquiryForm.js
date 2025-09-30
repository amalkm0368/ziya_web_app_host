import { addToastStyles, showToast } from './toastUtils.js';
import { 
  validateField, 
  validateForm, 
  showError, 
  clearError, 
  clearAllErrors 
} from './formValidation.js';
import { setLoadingState, resetForm } from './formState.js';
import { animateForm } from './uiAnimations.js';
import { toggleSubOptions } from './formUtils.js'; 


addToastStyles();


document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('enquiryForm')) {
    initEnquiryForm();
  } else {
    const observer = new MutationObserver(function() {
      if (document.getElementById('enquiryForm')) {
        initEnquiryForm();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});

function initEnquiryForm() {
  const enquiryForm = document.getElementById('enquiryForm');
  if (!enquiryForm) return;

  const elements = {
    form: enquiryForm,
    categorySelect: document.getElementById('category'),
    submitBtn: document.querySelector('.enquiry-submit-btn'),
    formCard: document.querySelector('.enquiry-form-card')
  };

  setupEventListeners(elements);
  toggleSubOptions(elements.categorySelect?.value);
  if (elements.formCard) animateForm(elements.formCard);

  function setupEventListeners({ form, categorySelect }) {
    form.addEventListener('submit', handleSubmit);

    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        toggleSubOptions(e.target.value);
        clearError('category');
      });
    }

    ['name', 'email', 'phone', 'category'].forEach(field => {
      const element = document.getElementById(field);
      if (element) element.addEventListener('blur', validateField);
    });

    ['school_class', 'internship', 'it_service'].forEach(field => {
      const element = document.getElementById(field);
      if (element) element.addEventListener('blur', validateField);
    });

    const termsCheckbox = document.getElementById('termsCheckbox');
    if (termsCheckbox) {
      termsCheckbox.addEventListener('change', () => {
        clearError('termsAccepted');
      });
    }
  }

  function toggleSubOptions(category) {
    const optionsContainers = {
      school: document.getElementById('school-options'),
      internship: document.getElementById('internship-options'),
      it_services: document.getElementById('it-services-options')
    };

    Object.values(optionsContainers).forEach(container => {
      if (container) container.style.display = 'none';
    });

    if (category && optionsContainers[category]) {
      optionsContainers[category].style.display = 'block';
      
      if (category === 'internship') {
        const termsCheckbox = document.getElementById('termsCheckbox');
        if (termsCheckbox && !termsCheckbox.checked) {
          showToast(
            "Please review and accept our terms & conditions",
            'warning'
          );
        }
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const originalBtnText = elements.submitBtn.innerHTML;
    setLoadingState(elements.submitBtn, true);

    try {
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        category: document.getElementById('category').value,
        message: document.getElementById('message')?.value.trim() || ''
      };

      switch(formData.category) {
        case 'school':
          formData.school_class = document.getElementById('school_class').value;
          break;
        case 'internship':
          formData.internship = document.getElementById('internship').value;
          formData.termsAccepted = document.getElementById('termsCheckbox').checked;
          break;
        case 'it_services':
          formData.it_service = document.getElementById('it_service').value;
          break;
      }

      const response = await axios.post('https://api-ziya-academy.onrender.com', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        showToast(
          "Thank you! Your enquiry has been sent successfully.",
          'success'
        );
        resetForm(elements.form, elements.categorySelect);
      }
    } catch (error) {
      console.error('Submission error:', error);
      let errorMessage = "Failed to submit form. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message.includes('Network Error')) {
        errorMessage = "Network error. Please check your connection.";
      }

      showToast(errorMessage, 'error');
    } finally {
      setLoadingState(elements.submitBtn, false, originalBtnText);
    }
  }
}