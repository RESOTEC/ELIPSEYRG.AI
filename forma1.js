
function resolverElipse() {
  const a = parseInt(document.getElementById('a').value);
  const b = parseInt(document.getElementById('b').value);
  const output = document.getElementById('output');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  if (!a || !b || a <= 0 || b <= 0) {
    output.textContent = "Por favor ingresa valores válidos para a y b (mayores que 0).";
    return;
  }

  let texto = `Resolviendo la elipse con semiejes a = ${a}, b = ${b}\n`;
  texto += `Usando el Método del Punto Medio:\n\n`;

  let puntos = [];
  let x = 0;
  let y = b;

  let a2 = a * a;
  let b2 = b * b;

  // Región 1
  let d1 = b2 - a2 * b + 0.25 * a2;
  texto += `Región 1:\n`;
  texto += `d1 inicial = ${d1.toFixed(2)}\n`;

  while ((2 * b2 * x) < (2 * a2 * y)) {
    puntos.push({ x, y });
    texto += `x=${x}, y=${y}, d1=${d1.toFixed(2)}\n`;
    if (d1 < 0) {
      x++;
      d1 += b2 * (2 * x + 1);
    } else {
      x++;
      y--;
      d1 += b2 * (2 * x + 1) + a2 * (-2 * y + 1);
    }
  }

  // Región 2
  let d2 = b2 * (x + 0.5) ** 2 + a2 * (y - 1) ** 2 - a2 * b2;
  texto += `\nRegión 2:\n`;
  texto += `d2 inicial = ${d2.toFixed(2)}\n`;

  while (y >= 0) {
    puntos.push({ x, y });
    texto += `x=${x}, y=${y}, d2=${d2.toFixed(2)}\n`;
    if (d2 > 0) {
      y--;
      d2 += a2 * (-2 * y + 1);
    } else {
      x++;
      y--;
      d2 += b2 * (2 * x + 1) + a2 * (-2 * y + 1);
    }
  }

  texto += `\nTotal de puntos generados en el primer cuadrante: ${puntos.length}`;
  texto += `\nTotal de puntos en toda la elipse (simetría de 4 cuadrantes): ${puntos.length * 4}`;
  texto += `\n\nCoordenadas simétricas (otros cuadrantes) generadas reflejando los puntos.\n`;
  output.textContent = texto;

  // Dibujar
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(ctx, canvas.width, canvas.height, 20);
  drawAxis(ctx, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = 5;

  ctx.fillStyle = "blue";
  puntos.forEach(p => {
    plot(ctx, centerX, centerY, p.x, p.y, scale);
    plot(ctx, centerX, centerY, -p.x, p.y, scale);
    plot(ctx, centerX, centerY, p.x, -p.y, scale);
    plot(ctx, centerX, centerY, -p.x, -p.y, scale);
  });
}

function plot(ctx, cx, cy, x, y, scale) {
  ctx.fillRect(cx + x * scale, cy - y * scale, 2, 2);
}

function drawAxis(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1.5;

  // Eje X
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.stroke();

  // Eje Y
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.stroke();
}

function drawGrid(ctx, width, height, spacing) {
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  // Líneas verticales
  for (let x = 0; x <= width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Líneas horizontales
  for (let y = 0; y <= height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}
