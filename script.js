// SkillUp Landing Page Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect & Active Link Highlight
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Section ScrollSpy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 2. Course Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseItems = document.querySelectorAll('.course-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            courseItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('animate-fade-in');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 3. Favorite Heart Button Toggle
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.className = 'fa-solid fa-heart text-danger';
            } else {
                icon.className = 'fa-regular fa-heart text-slate';
            }
        });
    });

    // 4. Enroll Modal Handler
    const courseModalEl = document.getElementById('courseModal');
    const courseModal = new bootstrap.Modal(courseModalEl);
    const modalTitle = document.getElementById('modalCourseTitle');
    const modalName = document.getElementById('modalCourseName');
    const modalPrice = document.getElementById('modalCoursePrice');
    const confirmEnrollBtn = document.getElementById('confirmEnrollBtn');

    const enrollBtns = document.querySelectorAll('.enroll-btn');
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const price = btn.getAttribute('data-price');

            modalTitle.textContent = `Enroll in ${title}`;
            modalName.textContent = title;
            modalPrice.textContent = price;

            courseModal.show();
        });
    });

    confirmEnrollBtn.addEventListener('click', () => {
        courseModal.hide();
        showToast(`🎉 Congratulations! You have successfully enrolled in ${modalName.textContent}.`);
    });

    // 5. Contact Form Validation & Toast Notification
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successToastEl = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    const toast = new bootstrap.Toast(successToastEl, { delay: 4000 });

    function showToast(msg) {
        toastMessage.textContent = msg;
        toast.show();
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                showToast('⚠️ Please fill out all required fields.');
                return;
            }

            // Simulate Loading State
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Sending...</span>
            `;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                contactForm.reset();
                showToast(`Thank you, ${name}! Your message has been sent successfully.`);
            }, 1200);
        });
    }

    // 6. Smooth scroll for internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile collapsed navbar if open
                const navbarCollapse = document.getElementById('navbarContent');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

});
