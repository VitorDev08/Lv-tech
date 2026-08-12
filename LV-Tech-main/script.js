const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('main-navigation');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });
}

const servicesCarousel = document.getElementById('services-carousel');
const prevBtn = document.getElementById('services-prev');
const nextBtn = document.getElementById('services-next');

if (servicesCarousel && prevBtn && nextBtn) {
  const scrollStep = 320;
  const autoScrollInterval = 3500;
  let autoScrollTimer = null;

  const scrollNext = () => {
    const maxScroll = servicesCarousel.scrollWidth - servicesCarousel.clientWidth;
    if (servicesCarousel.scrollLeft >= maxScroll - 10) {
      servicesCarousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      servicesCarousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (servicesCarousel.scrollLeft <= 10) {
      servicesCarousel.scrollTo({ left: servicesCarousel.scrollWidth, behavior: 'smooth' });
    } else {
      servicesCarousel.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollTimer = setInterval(scrollNext, autoScrollInterval);
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  };

  prevBtn.addEventListener('click', () => {
    scrollPrev();
    startAutoScroll();
  });

  nextBtn.addEventListener('click', () => {
    scrollNext();
    startAutoScroll();
  });

  servicesCarousel.addEventListener('mouseenter', stopAutoScroll);
  servicesCarousel.addEventListener('mouseleave', startAutoScroll);
  servicesCarousel.addEventListener('touchstart', stopAutoScroll, { passive: true });
  servicesCarousel.addEventListener('touchend', startAutoScroll, { passive: true });

  startAutoScroll();
}

// Formulário de Contato enviado para WhatsApp
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const idea = document.getElementById('idea').value.trim();

    // Número do WhatsApp que receberá a mensagem
    const targetPhoneNumber = '65992623292';

    const message = `*SOLICITAÇÃO DE CONTATO - LV TECH*\n` +
      `----------------------------------------\n\n` +
      `*Cliente:* ${name}\n` +
      `*E-mail:* ${email}\n\n` +
      `*Ideia / Detalhes do Projeto:*\n` +
      `${idea}\n\n` +
      `----------------------------------------\n` +
      `_Mensagem enviada via formulário do site_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  });
}

