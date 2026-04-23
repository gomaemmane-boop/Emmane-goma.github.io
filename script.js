// ==========================================
// MENU NAVIGATION RESPONSIVE
// ==========================================

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Fermer menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Fermer menu au clic en dehors
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    }
});

// ==========================================
// HEADER AU SCROLL
// ==========================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter classe scrolled
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// NAVIGATION ACTIVE AU SCROLL
// ==========================================

const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SCROLL FLUIDE
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ANIMATIONS AU SCROLL (Fade In)
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer les cartes de compétences
document.querySelectorAll('.competence-card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

// Observer les cartes de projets
document.querySelectorAll('.projet-card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

// Observer les items de galerie
document.querySelectorAll('.galerie-item').forEach(item => {
    item.classList.add('fade-in');
    observer.observe(item);
});

// ==========================================
// FILTRES GALERIE
// ==========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const galerieItems = document.querySelectorAll('.galerie-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer active de tous les boutons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Ajouter active au bouton cliqué
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galerieItems.forEach(item => {
            // Animation de sortie
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    // Animation d'entrée
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            }, 300);
        });
    });
});

// ==========================================
// MODAL VIDÉO
// ==========================================

const videoModal = document.getElementById('video-modal');
const videoContainer = document.getElementById('video-container');
const videoModalClose = document.getElementById('video-modal-close');
const videoLinks = document.querySelectorAll('.video-link');

// Exemples de liens vidéo (à remplacer par vos vraies vidéos)
const videos = {
    video1: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    video2: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    video3: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    video4: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
};

videoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = link.getAttribute('data-video');
        const videoUrl = videos[videoId];
        
        if (videoUrl) {
            videoContainer.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Fermer modal
videoModalClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

function closeVideoModal() {
    videoModal.classList.remove('active');
    videoContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
}

// Fermer avec ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

// ==========================================
// BOUTON RETOUR EN HAUT
// ==========================================

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// FORMULAIRE CONTACT
// ==========================================

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validation basique
    if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    // Simulation d'envoi (remplacer par votre vraie logique d'envoi)
    console.log('Formulaire soumis:', { name, email, subject, message });
    
    // Message de confirmation
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    
    // Réinitialiser le formulaire
    contactForm.reset();
    
    // Note: Pour un vrai envoi d'email, vous devrez utiliser un service backend
    // comme EmailJS, Formspree, ou votre propre serveur
});

// ==========================================
// EFFETS SUR LES PROJETS (Hover dynamique)
// ==========================================

const projetCards = document.querySelectorAll('.projet-card');

projetCards.forEach(card => {
    const overlay = card.querySelector('.projet-overlay');
    
    card.addEventListener('mouseenter', () => {
        // Animation supplémentaire au hover
        overlay.style.transition = 'opacity 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        overlay.style.transition = 'opacity 0.3s ease';
    });
});

// ==========================================
// ANIMATION DES STATISTIQUES (Compteur)
// ==========================================

const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPlus = target.includes('+');
    const isPercent = target.includes('%');
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
    
    let current = 0;
    const increment = numericValue / 50;
    const duration = 1500; // ms
    const stepTime = duration / 50;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(counter);
        }
        
        let displayValue = Math.floor(current);
        if (isPlus) displayValue += '+';
        if (isPercent) displayValue += '%';
        
        element.textContent = displayValue;
    }, stepTime);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// EFFETS DE PARALLAXE LÉGER
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image-wrapper');
    
    if (heroImage && window.innerWidth > 768) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ==========================================
// GALERIE - LIGHTBOX (Agrandir les images)
// ==========================================

const galerieImageItems = document.querySelectorAll('.galerie-item[data-category="images"]');

galerieImageItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Créer un lightbox simple
            const lightbox = document.createElement('div');
            lightbox.className = 'video-modal active';
            lightbox.innerHTML = `
                <div class="video-modal-content">
                    <button class="video-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                    <img src="${img.src}" alt="${img.alt}" style="max-width: 100%; max-height: 90vh; border-radius: 12px;">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Fermer le lightbox
            const closeLightbox = () => {
                lightbox.remove();
                document.body.style.overflow = 'auto';
            };
            
            lightbox.querySelector('.video-modal-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
        }
    });
});

// ==========================================
// PRÉCHARGEMENT DES IMAGES
// ==========================================

window.addEventListener('load', () => {
    // Ajouter une animation de chargement terminé
    document.body.classList.add('loaded');
    
    // Précharger les images importantes
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.getAttribute('data-src');
    });
});

// ==========================================
// DÉTECTION DE NAVIGATION AU CLAVIER (Accessibilité)
// ==========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==========================================
// PERFORMANCE - Throttle pour le scroll
// ==========================================

function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

// Appliquer throttle aux événements de scroll gourmands
window.addEventListener('scroll', throttle(() => {
    // Code optimisé pour le scroll
}, 100));

// ==========================================
// EASTER EGG - Konami Code (optionnel, fun!)
// ==========================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Easter egg activé !
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c👋 Bienvenue sur mon portfolio!', 'color: #163A63; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Développé avec passion par Christ Emmane GOMA', 'color: #3FA16C; font-size: 14px;');
console.log('%c💼 Vous recrutez? Contactez-moi: gomaemmane@gmail.com', 'color: #163A63; font-size: 12px;');

// ==========================================
// INIT - Fonction d'initialisation
// ==========================================

function init() {
    console.log('Portfolio initialisé avec succès ✅');
    
    // Vérifier que tous les éléments critiques sont chargés
    const criticalElements = [
        document.getElementById('header'),
        document.getElementById('hero'),
        document.getElementById('contact-form')
    ];
    
    const allLoaded = criticalElements.every(el => el !== null);
    
    if (!allLoaded) {
        console.warn('⚠️ Certains éléments critiques ne sont pas chargés');
    }
}

// Lancer l'initialisation quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
