export function toggleSubOptions(category) {
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