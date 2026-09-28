const scenes = [...document.querySelectorAll('.scene')];
const metricEls = document.querySelectorAll('[data-count]');

let activeIndex = 0;
const sceneDuration = 4200;

function showScene(index) {
  activeIndex = (index + scenes.length) % scenes.length;
  scenes.forEach((scene, i) => {
    scene.classList.toggle('active', i === activeIndex);
  });
}

function animateNumbers() {
  metricEls.forEach((el) => {
    const target = Number(el.dataset.count || 0);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-US');
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

function autoCycle() {
  showScene(activeIndex + 1);
  setTimeout(autoCycle, sceneDuration);
}

showScene(0);
animateNumbers();
setTimeout(autoCycle, sceneDuration);

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') showScene(activeIndex + 1);
  if (event.key === 'ArrowLeft') showScene(activeIndex - 1);
});
