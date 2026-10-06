// A small software 3D renderer converts the chip's rotating faces to ASCII.
document.querySelectorAll('.hero-chip-art').forEach((canvas) => {
  const direction = Number(canvas.dataset.direction) === -1 ? -1 : 1;
  const context = canvas.getContext('2d');
  if (!context) return;
  const sample = document.createElement('canvas');
  const columns = 120, rows = 72;
  sample.width = columns;
  sample.height = rows;
  const raster = sample.getContext('2d', { willReadFrequently: true });
  if (!raster) return;
  const glyphs = ' .:-=+*#%@';
  const faces = [];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let angle = -0.45 * direction, previous = 0, frame = 0, visible = false;
  let size = 460, color = '#6fd3c7';

  function box(x, y, z, width, height, depth, tone = 1) {
    const vertices = [
      [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
      [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1],
    ].map(([a,b,c]) => [x+a*width/2, y+b*height/2, z+c*depth/2]);
    [
      [[0,3,2,1],[0,0,-1]], [[4,5,6,7],[0,0,1]],
      [[0,4,7,3],[-1,0,0]], [[1,2,6,5],[1,0,0]],
      [[0,1,5,4],[0,-1,0]], [[3,7,6,2],[0,1,0]],
    ].forEach(([indices, normal]) => faces.push({
      points: indices.map(index => vertices[index]), normal, tone,
    }));
  }
  // A darker package, raised border, and bright die stay distinct face-on.
  box(0,0,0,1.65,1.65,.32,.5);
  for (const side of [-1,1]) {
    box(0,0,side*.21,1.05,1.05,.1,.3);
    box(0,0,side*.30,.72,.72,.14,1.25);
    box(0,0,side*.39,.36,.36,.04,.65);
    for (const edge of [-1,1]) {
      box(edge*.51,0,side*.29,.055,1.05,.06,1.1);
      box(0,edge*.51,side*.29,1.05,.055,.06,1.1);
    }
    // Short traces connect the raised die to the outer package.
    for (const offset of [-.3,0,.3]) {
      for (const edge of [-1,1]) {
        box(offset,edge*.68,side*.18,.035,.22,.035,.9);
        box(edge*.68,offset,side*.18,.22,.035,.035,.9);
      }
    }
  }
  for (let pin = 0; pin < 6; pin++) {
    const offset = (pin - 2.5) * .25;
    for (const side of [-1,1]) {
      box(offset,side*.99,0,.11,.35,.12);
      box(side*.99,offset,0,.35,.11,.12);
    }
  }

  function rotate([x,y,z]) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const xx = x*c + z*s, zz = -x*s + z*c;
    const tilt = .42;
    return [xx, y*Math.cos(tilt)-zz*Math.sin(tilt), y*Math.sin(tilt)+zz*Math.cos(tilt)];
  }

  function draw() {
    raster.clearRect(0,0,columns,rows);
    const projected = faces.map(face => {
      const points = face.points.map(rotate);
      return { points, tone: face.tone, normal: rotate(face.normal), depth: points.reduce((sum,p) => sum+p[2],0)/4 };
    }).filter(face => face.normal[2] > 0).sort((a,b) => a.depth-b.depth);
    projected.forEach(({points, normal, tone}) => {
      // Surface orientation and material contrast determine character density.
      const light = Math.round(255 * Math.min(1, tone * (.25 + .65 * Math.abs(normal[0]*.3 + normal[1]*.5 + normal[2]*.8))));
      raster.fillStyle = `rgb(${light},${light},${light})`;
      raster.beginPath();
      points.forEach(([x,y,z], index) => {
        const perspective = 3.8 / (3.8-z);
        const px = columns/2 + x*perspective*columns/3.5;
        const py = rows/2 + y*perspective*rows/3.5;
        if (index === 0) raster.moveTo(px,py); else raster.lineTo(px,py);
      });
      raster.closePath();
      raster.fill();
    });
    const pixels = raster.getImageData(0,0,columns,rows).data;
    context.clearRect(0,0,size,size);
    const cellWidth = size/columns, cellHeight = size/rows;
    context.font = `${cellHeight}px monospace`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = color;
    for (let y=0; y<rows; y++) for (let x=0; x<columns; x++) {
      const index = (y*columns+x)*4;
      if (pixels[index+3] < 100) continue;
      const glyph = glyphs[Math.max(1,Math.round(pixels[index]/255*(glyphs.length-1)))];
      context.fillText(glyph,(x+.5)*cellWidth,(y+.5)*cellHeight,cellWidth);
    }
  }

  function tick(time) {
    if (time-previous >= 1000/30) {
      angle += previous ? Math.min(time-previous,100)*.00072*direction : 0;
      previous = time;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    previous = 0;
    draw();
    if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(tick);
  }
  new ResizeObserver(() => {
    size = canvas.getBoundingClientRect().width;
    if (!size) return;
    const ratio = Math.min(devicePixelRatio || 1,2);
    canvas.width = Math.round(size*ratio);
    canvas.height = Math.round(size*ratio);
    context.setTransform(ratio,0,0,ratio,0,0);
    color = getComputedStyle(canvas).color;
    draw();
  }).observe(canvas);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(canvas);
  motion.addEventListener('change',sync);
  document.addEventListener('visibilitychange',sync);
});
