self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('SNAKISMS').then(cache => {
      return cache.addAll([
        '/',
        'js/phaser.min.js',
        'js/swipe.js',
        'Boot.js',
        'Preloader.js',
        'Menu.js',
        'snakes/Snake.js',
        'snakes/Anthropomorphism.js',
        'snakes/Apocalypticism.js',
        'snakes/Asceticism.js',
        'snakes/Capitalism.js',
        'snakes/Casualism.js',
        'snakes/Conservatism.js',
        'snakes/Determinism.js',
        'snakes/Dualism.js',
        'snakes/Existentialism.js',
        'snakes/Holism.js',
        'snakes/Idealism.js',
        'snakes/Monism.js',
        'snakes/Narcissism.js',
        'snakes/Nihilism.js',
        'snakes/Optimism.js',
        'snakes/Pessimism.js',
        'snakes/Positivism.js',
        'snakes/PostApocalypticism.js',
        'snakes/Romanticism.js',
        'snakes/Stoicism.js',
        'snakes/Utilitarianism.js',
        // Save Fonts
        'assets/fonts/atari.png',
        'assets/fonts/atari.xml',
        // Save Images
        'assets/images/apple.png',
        'assets/images/black.png',
        'assets/images/head.png',
        'assets/images/wall.png',
        'assets/images/postapocalyptic01.png',
        'assets/images/postapocalyptic02.png',
        'assets/images/postapocalyptic03.png',
        'assets/images/postapocalyptic04.png',
        'assets/images/postapocalyptic05.png',
        // Save sounds
        'assets/sounds/apple.mp3',
        'assets/sounds/apple.ogg',
        'assets/sounds/apple.wav',
        'assets/sounds/hit.mp3',
        'assets/sounds/hit.ogg',
        'assets/sounds/hit.wav',
        'assets/sounds/move.mp3',
        'assets/sounds/move.ogg',
        'assets/sounds/move.wav',
        'assets/sounds/romanticmusic.mp3',
        'assets/sounds/romanticmusic.ogg'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});