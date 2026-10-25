// Render the chip's faces to a small canvas, then convert their brightness to ASCII.
export function startChipAnimation(canvas, direction) {
  const context = canvas.getContext('2d');
  if (!context) return;

  const columns = 120;
  const rows = 72;
  const sample = document.createElement('canvas');
  sample.width = columns;
  sample.height = rows;

  const raster = sample.getContext('2d', { willReadFrequently: true });
  if (!raster) return;

  const glyphs = ' .:-=+*#%@';
  const faces = [];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let angle = -0.45 * direction;
  let previous = 0;
  let frame = 0;
  let visible = false;
  let size = 460;
  let color = getComputedStyle(canvas).color;

  function box(x, y, z, width, height, depth, tone = 1) {
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    ].map(([a, b, c]) => [
      x + a * width / 2,
      y + b * height / 2,
      z + c * depth / 2,
    ]);

    const sides = [
      [[0, 3, 2, 1], [0, 0, -1]],
      [[4, 5, 6, 7], [0, 0, 1]],
      [[0, 4, 7, 3], [-1, 0, 0]],
      [[1, 2, 6, 5], [1, 0, 0]],
      [[0, 1, 5, 4], [0, -1, 0]],
      [[3, 7, 6, 2], [0, 1, 0]],
    ];

    sides.forEach(([indices, normal]) => {
      faces.push({ points: indices.map(index => vertices[index]), normal, tone });
    });
  }

  // Package, raised die, traces, and pins.
  box(0, 0, 0, 1.65, 1.65, 0.32, 0.5);
  for (const side of [-1, 1]) {
    box(0, 0, side * 0.21, 1.05, 1.05, 0.1, 0.3);
    box(0, 0, side * 0.30, 0.72, 0.72, 0.14, 1.25);
    box(0, 0, side * 0.39, 0.36, 0.36, 0.04, 0.65);
    for (const edge of [-1, 1]) {
      box(edge * 0.51, 0, side * 0.29, 0.055, 1.05, 0.06, 1.1);
      box(0, edge * 0.51, side * 0.29, 1.05, 0.055, 0.06, 1.1);
    }
    for (const offset of [-0.3, 0, 0.3]) {
      for (const edge of [-1, 1]) {
        box(offset, edge * 0.68, side * 0.18, 0.035, 0.22, 0.035, 0.9);
        box(edge * 0.68, offset, side * 0.18, 0.22, 0.035, 0.035, 0.9);
      }
    }
  }
  for (let pin = 0; pin < 6; pin++) {
    const offset = (pin - 2.5) * 0.25;
    for (const side of [-1, 1]) {
      box(offset, side * 0.99, 0, 0.11, 0.35, 0.12);
      box(side * 0.99, offset, 0, 0.35, 0.11, 0.12);
    }
  }

  function rotate([x, y, z]) {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const rotatedX = x * cosine + z * sine;
    const rotatedZ = -x * sine + z * cosine;
    const tilt = 0.42;
    return [
      rotatedX,
      y * Math.cos(tilt) - rotatedZ * Math.sin(tilt),
      y * Math.sin(tilt) + rotatedZ * Math.cos(tilt),
    ];
  }

  function draw() {
    raster.clearRect(0, 0, columns, rows);
    const projected = faces.map(face => {
      const points = face.points.map(rotate);
      return {
        points,
        tone: face.tone,
        normal: rotate(face.normal),
        depth: points.reduce((sum, point) => sum + point[2], 0) / points.length,
      };
    });
    const visibleFaces = projected
      .filter(face => face.normal[2] > 0)
      .sort((a, b) => a.depth - b.depth);

    visibleFaces.forEach(({ points, normal, tone }) => {
      const lighting = Math.abs(normal[0] * 0.3 + normal[1] * 0.5 + normal[2] * 0.8);
      const brightness = Math.min(1, tone * (0.25 + 0.65 * lighting));
      const light = Math.round(255 * brightness);
      raster.fillStyle = `rgb(${light},${light},${light})`;
      raster.beginPath();
      points.forEach(([x, y, z], index) => {
        const perspective = 3.8 / (3.8 - z);
        const px = columns / 2 + x * perspective * columns / 3.5;
        const py = rows / 2 + y * perspective * rows / 3.5;
        if (index === 0) {
          raster.moveTo(px, py);
        } else {
          raster.lineTo(px, py);
        }
      });
      raster.closePath();
      raster.fill();
    });

    const pixels = raster.getImageData(0, 0, columns, rows).data;
    const cellWidth = size / columns;
    const cellHeight = size / rows;
    context.clearRect(0, 0, size, size);
    context.font = `${cellHeight}px monospace`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = color;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const index = (y * columns + x) * 4;
        if (pixels[index + 3] < 100) continue;
        const glyphIndex = Math.max(1, Math.round(pixels[index] / 255 * (glyphs.length - 1)));
        context.fillText(glyphs[glyphIndex], (x + 0.5) * cellWidth, (y + 0.5) * cellHeight, cellWidth);
      }
    }
  }

  function tick(time) {
    if (time - previous >= 1000 / 30) {
      if (previous) {
        angle += Math.min(time - previous, 100) * 0.00072 * direction;
      }
      previous = time;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    cancelAnimationFrame(frame);
    previous = 0;
    draw();
    if (visible && !document.hidden && !motion.matches) {
      frame = requestAnimationFrame(tick);
    }
  }

  const resizeObserver = new ResizeObserver(() => {
    size = canvas.getBoundingClientRect().width;
    if (!size) return;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * ratio);
    canvas.height = Math.round(size * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    color = getComputedStyle(canvas).color;
    draw();
  });
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });

  resizeObserver.observe(canvas);
  visibilityObserver.observe(canvas);
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    motion.removeEventListener('change', sync);
    document.removeEventListener('visibilitychange', sync);
  };
}
