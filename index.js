// Track the currently playing audio ID and its element
//For Social Icons
let currentAudio = {
  id: null,
  element: null
};

document.querySelectorAll('.hero__social-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    var linkId = this.id;
    var audio = document.getElementById('menu');
    if (linkId !== currentAudio.id || audio.paused) {
      if (currentAudio.element && !currentAudio.element.paused) {
        currentAudio.element.pause();
        currentAudio.element.currentTime = 0;
      }
      currentAudio = { id: linkId, element: audio };
      audio.play().catch(e => console.error('Audio error:', e));
    }
  });
});
document.getElementById('unity').addEventListener('ended', () => {
  currentAudio = { id: null, element: null };
});


// Audio controller for contact social links
const contactSocialAudio = {
  currentId: null,
  audioElement: document.getElementById('menu'),
  
  handleHover: function(elementId) {
    // Only proceed if new element or audio finished
    if (elementId !== this.currentId || this.audioElement.paused) {
      // Stop current playback if active
      if (!this.audioElement.paused) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      }
      
      // Update and play
      this.currentId = elementId;
      this.audioElement.play().catch(e => console.error('Audio error:', e));
    }
  },
  
  reset: function() {
    this.currentId = null;
  }
};

// Setup event listeners
document.querySelectorAll('.contact__social-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    contactSocialAudio.handleHover(this.id);
  });
});

// Reset when audio completes
contactSocialAudio.audioElement.addEventListener('ended', () => {
  contactSocialAudio.reset();
});

// Initialize audio element and tracker
const skillsAudio = document.getElementById('items');
let currentSkillAudio = {
  id: null,
  element: skillsAudio
};

// Button hover sound controller
const buttonHoverSound = {
  audio: document.getElementById('menu'),  // Use your audio element
  currentButton: null,
  
  init: function() {
    // Add hover event to all buttons
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('mouseenter', (e) => {
        this.handleHover(e.target);
      });
    });
    
    // Reset when sound finishes
    this.audio.addEventListener('ended', () => {
      this.currentButton = null;
    });
  },
  
  handleHover: function(button) {
    // Skip if same button and audio still playing
    if (button === this.currentButton && !this.audio.paused) return;
    
    // Stop current playback if needed
    if (!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    
    // Play sound for new button
    this.currentButton = button;
    this.audio.play().catch(e => console.log('Audio play failed:', e));
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  buttonHoverSound.init();
});

// Set up event listeners for skills items
document.querySelectorAll('.skills__item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    const skillId = this.id;
    
    // Only proceed if this is a new skill or audio isn't playing
    if (skillId !== currentSkillAudio.id || skillsAudio.paused) {
      // Stop previous audio if it's playing
      if (!currentSkillAudio.element.paused) {
        currentSkillAudio.element.pause();
        currentSkillAudio.element.currentTime = 0;
      }
      
      // Update tracker and play new audio
      currentSkillAudio = { id: skillId, element: skillsAudio };
      skillsAudio.play().catch(e => console.error('Audio error:', e));
    }
  });
});

// Reset tracking when audio finishes
skillsAudio.addEventListener('ended', () => {
  currentSkillAudio = { id: null, element: skillsAudio };
});


// For Nav Menu and Unity Glow
var menuAudio = document.getElementById('menu');
var unityAudio = document.getElementById('unity');
var gameAudio = document.getElementById('game_audio');

// Play menu sound on navigation links hover (plays every time)
var navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    menuAudio.currentTime = 0; // Rewind to start
    menuAudio.play();
  });
});

// Play unity sound on projects placeholder hover (plays only ONCE EVER)
var projectsPlaceholder = document.querySelector('.projects__placeholder');
if (projectsPlaceholder) {
  let hasUnityPlayed = false; // Flag to track if it's played
  
  projectsPlaceholder.addEventListener('mouseover', () => {
    if (!hasUnityPlayed) {
      unityAudio.currentTime = 0; // Rewind to start
      unityAudio.play();
      hasUnityPlayed = true; // Mark as played
      
      // Optional: Remove the event listener after first play
      projectsPlaceholder.removeEventListener('mouseover', arguments.callee);
    }
  });
}

// Play game audio on projects image hover (plays only ONCE EVER)
var projectsImages = document.querySelectorAll('.projects__image');
projectsImages.forEach(image => {
  let hasGameAudioPlayed = false; // Flag to track if it's played
  
  image.addEventListener('mouseover', () => {
    if (!hasGameAudioPlayed && gameAudio) {
      gameAudio.currentTime = 0; // Rewind to start
      gameAudio.play();
      hasGameAudioPlayed = true; // Mark as played
      
      // Optional: Remove the event listener after first play
      image.removeEventListener('mouseover', arguments.callee);
    }
  });
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



