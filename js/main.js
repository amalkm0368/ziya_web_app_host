// Enquiry Form Functionality
function toggleSubOptions() {
  const category = document.getElementById("category").value;
  const subFields = ['school-options', 'internship-options', 'it-options'];
  subFields.forEach(field => {
    document.getElementById(field).style.display = 'none';
  });
  switch (category) {
    case 'school':
      document.getElementById('school-options').style.display = 'block';
      break;
    case 'internship':
      document.getElementById('internship-options').style.display = 'block';
      break;
    case 'it_services':
      document.getElementById('it-options').style.display = 'block';
      break;
  }
}
document.getElementById('enquiryForm')?.addEventListener('submit', function (e) {
  const submitBtn = document.querySelector('.enquiry-submit-btn');
  submitBtn.classList.add('loading');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i> Sending...';
  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = 'Send Enquiry';
  }, 3000);
});
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.enquiry-form-card');
  if (form) {
    form.style.opacity = '0';
    form.style.transform = 'translateY(50px)';

    setTimeout(() => {
      form.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      form.style.opacity = '1';
      form.style.transform = 'translateY(0)';
    }, 300);
  }

  // --- Counter Script Starts Here ---
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const targetText = counter.textContent.trim();
    const target = parseInt(targetText.replace(/\D/g, "")); // remove + or any symbols

    if (isNaN(target)) return;

    let count = 0;
    const increment = target / 100;
    const speed = 20; // smaller = faster

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.textContent = `${Math.ceil(count)}+`;
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = `${target}+`;
      }
    };

    updateCount();
  });
  // --- Counter Script Ends Here ---

  // Scroll to Top Logic
  const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });


  // Hamburger Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });


});