(() => {
  const canvas = document.querySelector("#starfield");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let frame;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(55, Math.round((width * height) / 10500));
    stars = Array.from({ length: count }, (_, index) => ({
      x: (((index * 71.3) % 100) / 100) * width,
      y: ((((index * 43.7) + 17) % 100) / 100) * height,
      radius: .35 + (index % 5) * .18,
      alpha: .18 + (index % 7) * .075,
      speed: .025 + (index % 4) * .01,
    }));
    draw();
  }

  function draw() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#c6ece0";
    stars.forEach((star) => {
      context.globalAlpha = star.alpha;
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
      if (!reduceMotion) {
        star.y -= star.speed;
        if (star.y < -2) star.y = height + 2;
      }
    });
    context.globalAlpha = 1;
    if (!reduceMotion) frame = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    cancelAnimationFrame(frame);
    resize();
  });
  resize();
})();
