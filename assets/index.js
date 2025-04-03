// Separate Unity Audio Handling
class UnityAudioController {
  constructor() {
    this.audio = document.getElementById('unity');
    this.hasPlayed = false;
    this.initialize();
  }

  initialize() {
    if (!this.audio) return;

    // Play once on placeholder hover
    document.querySelector('.projects__placeholder')?.addEventListener(
      'mouseover',
      () => this.playOnce(),
      { once: true }
    );

    // Reset other audio when complete
    this.audio.addEventListener('ended', () => {
      const heroController = new AudioController(document.getElementById('menu'));
      heroController.reset();
    });
  }

  playOnce() {
    if (!this.hasPlayed) {
      this.audio.currentTime = 0;
      this.audio.play().catch(console.error);
      this.hasPlayed = true;
    }
  }
}

// Initialize Unity audio when DOM loads
document.addEventListener('DOMContentLoaded', () => {
const soundPopup = document.getElementById('soundPopup');
const closePopup = document.getElementById('closePopup');

// Show popup after 2 seconds
setTimeout(() => {
  soundPopup.style.right = '0';
}, 2000); // 2000ms = 2 seconds

// Close button handler
closePopup.addEventListener('click', () => {
  soundPopup.style.right = '';
});
  new UnityAudioController();
});

// Shared utility function
function createPlayOnce(audioElement) {
  let played = false;
  return () => {
    if (!played && audioElement) {
      played = true;
      audioElement.currentTime = 0;
      audioElement.play().catch(e => console.error('Audio error:', e));
    }
  };
}

class AudioController {
  constructor(audioElement, { allowRestart = false, resetOnEnd = true } = {}) {
    this.audio = audioElement;
    this.currentId = null;
    this.allowRestart = allowRestart;
    if (resetOnEnd && audioElement) {
      audioElement.addEventListener('ended', () => this.reset());
    }
  }

  play(id = null) {
    if (!this.audio) return;
    
    if (id !== this.currentId || this.allowRestart || this.audio.paused) {
      this.stop();
      this.currentId = id;
      this.audio.play().catch(e => console.error('Audio error:', e));
    }
  }

  stop() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  reset() {
    this.currentId = null;
  }
}

// General Audio Setup
document.addEventListener('DOMContentLoaded', () => {
  // Common audio elements
  const audios = {
    menu: document.getElementById('menu'),
    items: document.getElementById('items'),
    game: document.getElementById('game_audio')
  };

  // General audio controllers
  const controllers = {
    heroSocial: new AudioController(audios.menu),
    contactSocial: new AudioController(audios.menu, { resetOnEnd: false }),
    skills: new AudioController(audios.items),
    buttons: new AudioController(audios.menu, { allowRestart: true }),
    nav: new AudioController(audios.menu, { allowRestart: true })
  };

  // General element setup
  const generalSetup = [
    { elements: '.hero__social-link', controller: controllers.heroSocial },
    { elements: '.contact__social-link', controller: controllers.contactSocial },
    { elements: '.skills__item', controller: controllers.skills },
    { elements: 'button', controller: controllers.buttons },
    { 
      elements: '.nav__link', 
      handler: (link) => link.addEventListener('mouseover', () => controllers.nav.play())
    }
  ];

  // Apply general event listeners
  generalSetup.forEach(({ elements, controller, handler }) => {
    if (handler) {
      document.querySelectorAll(elements).forEach(handler);
    } else if (controller) {
      document.querySelectorAll(elements).forEach(el => {
        el.addEventListener('mouseenter', (e) => controller.play(e.target.id));
      });
    }
  });

  // Game audio setup
  if (audios.game) {
    document.querySelectorAll('.projects__image').forEach(image => {
      image.addEventListener('mouseover', createPlayOnce(audios.game), { once: true });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const projectIcon = document.querySelector('.projects__icon');
  
  function handleFirstHover() {
    // Set inline style permanently
    this.style.fill = 'white';
    
    // Remove the hover event listener
    this.removeEventListener('mouseenter', handleFirstHover);
  }
  
  projectIcon.addEventListener('mouseenter', handleFirstHover);
});


var navbarToggler = document.querySelector('.nav__toggle');
var hamMenu = document.querySelector('.nav__mobile');
var closeBtn = document.querySelector('.nav__close');

if (navbarToggler && hamMenu) {
  navbarToggler.addEventListener('click', function() {
    hamMenu.style.left = '0'; // Show menu by setting left to 0
  });
}

if (closeBtn && hamMenu) {
  closeBtn.addEventListener('click', function() {
    hamMenu.style.left = '-100%'; // Hide menu by moving it off-screen
  });
}