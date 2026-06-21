// ================= منوی موبایل =================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// ================= اسکرول نرم =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ================= نوار پیشرفت اسکرول =================
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ================= دکمه برگشت به بالا =================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================= تغییر تم تاریک/روشن =================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});
// بررسی تم ذخیره‌شده
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    icon.classList.replace('fa-moon', 'fa-sun');
}

// ================= افکت تایپ خودکار =================
const typedSpan = document.getElementById('typed');
const phrases = [
    'توسعه‌دهنده وب',
    'بازی‌ساز حرفه ایی',
    'کارآفرین',
    'عاشق کدنویسی'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentPhrase = '';

function typeEffect() {
    const fullPhrase = phrases[phraseIndex];
    if (!isDeleting) {
        currentPhrase = fullPhrase.substring(0, charIndex + 1);
        charIndex++;
        typedSpan.textContent = currentPhrase;
        if (charIndex === fullPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500); // مکث قبل از حذف
            return;
        }
    } else {
        currentPhrase = fullPhrase.substring(0, charIndex - 1);
        charIndex--;
        typedSpan.textContent = currentPhrase;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? 80 : 120);
}
typeEffect();

// ================= افکت نمایش محتوا هنگام اسکرول =================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});
// اضافه کردن کلاس انیمیشن به CSS (در استایل‌ها گنجانده نشده، برای سادگی)
// اما می‌توانید این استایل را به style.css اضافه کنید:
/*
.section {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}
.section.visible {
    opacity: 1;
    transform: translateY(0);
}
*/
// در فایل CSS بالا، بخش `.section` از قبل opacity و transform ندارد،
// پس این قطعه را به انتهای style.css اضافه کنید.

// ================= فیلتر پروژه‌ها =================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // فعال کردن دکمه
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ================= فرم تماس (شبیه‌سازی ارسال) =================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formFeedback.textContent = 'پیام شما با موفقیت ارسال شد! (شبیه‌سازی)';
    formFeedback.style.color = 'var(--accent)';
    contactForm.reset();
    setTimeout(() => {
        formFeedback.textContent = '';
    }, 4000);
});

// فعال‌سازی انیمیشن مهارت‌ها هنگام اسکرول (اختیاری)
const skillBars = document.querySelectorAll('.skill-bar span');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.style.width; // trigger animation
            // از قبل عرض در HTML تنظیم شده، فقط یک رفرش
            const width = entry.target.getAttribute('style').match(/width:\s*(\d+)%/);
            if (width) {
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width[1] + '%';
                }, 200);
            }
        }
    });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillsObserver.observe(bar));