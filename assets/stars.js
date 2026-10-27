(() => {
  const canvas = document.querySelector("#starfield");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let frame;

  function randomGenerator(seed) {
    let value = seed >>> 0;
    return () => {
      value = ((value * 1664525) + 1013904223) >>> 0;
      return value / 4294967296;
    };
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const random = randomGenerator(24791 + Math.round(width) + Math.round(height));
    const count = Math.max(105, Math.round((width * height) / 5600));
    stars = Array.from({ length: count }, () => ({
      x: random() * width,
      y: random() * height,
      radius: .55 + random() * 1.25,
      alpha: .32 + random() * .58,
      speedX: .12 + random() * .28,
      speedY: .38 + random() * .72,
    }));
    draw();
  }

  function draw() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#111111";
    stars.forEach((star) => {
      context.globalAlpha = star.alpha;
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
      if (!reduceMotion) {
        star.x += star.speedX;
        star.y -= star.speedY;
        if (star.y < -3) star.y = height + 3;
        if (star.x > width + 3) star.x = -3;
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
