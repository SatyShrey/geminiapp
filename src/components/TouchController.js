let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  const threshold = 50; // Minimum swipe distance in px
  const diff = touchEndX - touchStartX;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      console.log('👉 Swipe Right');
    } else {
      console.log('👈 Swipe Left');
    }
  }
}

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});