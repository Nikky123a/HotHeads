const today = new Date();
const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const cards = document.querySelectorAll('.show-card');

const futureCards = [];

cards.forEach((card) => {
  const dateValue = card.dataset.date;
  if (!dateValue) return;

  const showDate = new Date(dateValue + 'T00:00:00');
  const isPast = showDate < todayStart;

  if (isPast) {
    const badge = document.createElement('div');
    badge.className = 'success-badge';
    badge.textContent = 'Gig successful';
    card.appendChild(badge);
  } else {
    futureCards.push({ card, showDate });
  }
});

if (futureCards.length > 0) {
  futureCards.sort((a, b) => a.showDate - b.showDate);
  const nextCard = futureCards[0].card;
  const nextBadge = document.createElement('div');
  nextBadge.className = 'next-gig-badge';
  nextBadge.textContent = 'Next Gig';
  nextCard.appendChild(nextBadge);
}

const galleryImages = [
  { src: 'Images/MainCoverPhoto.avif', alt: 'HotHeads main cover photo' },
  { src: 'Images/MainCoverPhoto1.avif', alt: 'HotHeads alternate cover photo' },
  { src: 'Images/bb8104_114568e85beb4546b4c2f9d96b9e604e~mv2.avif', alt: 'HotHeads photo 1' },
  { src: 'Images/bb8104_116465b2b7234c9497b0e5f17d0894a3~mv2.avif', alt: 'HotHeads photo 2' },
  { src: 'Images/bb8104_32e94c1df316465a83c25eed5070a3aa~mv2.avif', alt: 'HotHeads photo 3' },
  { src: 'Images/bb8104_3c08e60c60314cfd9ff2dbe7d1d17eb5~mv2 (1).avif', alt: 'HotHeads photo 4' },
  { src: 'Images/bb8104_3c08e60c60314cfd9ff2dbe7d1d17eb5~mv2.avif', alt: 'HotHeads photo 5' },
  { src: 'Images/bb8104_4ddc97564b5547599c0bbf1685567e1a~mv2.avif', alt: 'HotHeads photo 6' },
  { src: 'Images/bb8104_66d9d398a0044a34b41c20bb48264a9a~mv2.avif', alt: 'HotHeads photo 7' },
  { src: 'Images/bb8104_76aeaac69590477da7ecf0a63c338f19~mv2.avif', alt: 'HotHeads photo 8' },
  { src: 'Images/bb8104_9266b4442cbc4d5abf837bb59946e154~mv2.avif', alt: 'HotHeads photo 9' },
  { src: 'Images/bb8104_a2cc2a094747415c8c77fca7e1f8ca22~mv2.avif', alt: 'HotHeads photo 10' },
  { src: 'Images/bb8104_a6680dfe78874c289a0adaa92860e636~mv2.avif', alt: 'HotHeads photo 11' },
  { src: 'Images/bb8104_b756f98dfe0148e894c2dcea00e43210~mv2.avif', alt: 'HotHeads photo 12' },
  { src: 'Images/bb8104_b7a4998792c4448e8520fb3a71165e6f~mv2.avif', alt: 'HotHeads photo 13' },
  { src: 'Images/bb8104_d4f1cad2ecf546a1a3d1d81171248596~mv2.avif', alt: 'HotHeads photo 14' },
  { src: 'Images/bb8104_e4f3dcec751e4a7dbda2d6a41da9561b~mv2.avif', alt: 'HotHeads photo 15' },
  { src: 'Images/bb8104_fe99a84e7b9349deaecda029e77014af~mv2_d_2048_1536_s_2.avif', alt: 'HotHeads photo 16' },
  { src: 'Images/IMG_20260621_000117_DRO.jpg', alt: 'HotHeads live photo' }
];

const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

if (galleryGrid) {
  galleryImages.forEach((image) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-card';
    figure.dataset.full = image.src;

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;

    figure.appendChild(img);
    galleryGrid.appendChild(figure);
  });
}

const openLightbox = (src, alt) => {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const galleryCards = document.querySelectorAll('.gallery-card');

galleryCards.forEach((card) => {
  card.addEventListener('click', () => {
    openLightbox(card.dataset.full, card.querySelector('img')?.alt || 'Expanded image');
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});
