function resolverElipse() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const output = document.getElementById("output");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (!a || !b || a <= 0 || b <= 0) {
    output.textContent = "Por favor ingresa valores válidos para a y b (mayores que 0).";
    return;
  }

  // Explicación paso a paso mejorada
  let texto = ` Resolución paso a paso de la ecuación canónica de la elipse \n\n`;

  texto += `1) Presentas la fórmula general de la elipse centrada en el origen:\n\n`;
  texto += `   (x²) / (a²) + (y²) / (b²) = 1\n\n`;

  texto += `2) Defines correctamente los semiejes a y b:\n`;
  texto += `   - a (semieje mayor) = ${a}\n`;
  texto += `   - b (semieje menor) = ${b}\n\n`;

  texto += `3) Haces el reemplazo con los valores dados y calculas los cuadrados:\n\n`;
  texto += `   (x²) / (${a}²) + (y²) / (${b}²) = 1\n`;
  texto += `   (x²) / (${(a ** 2).toFixed(2)}) + (y²) / (${(b ** 2).toFixed(2)}) = 1\n\n`;

  texto += `4) Despejas y para obtener la forma para graficar:\n\n`;
  texto += `   (y²) / (b²) = 1 - (x²) / (a²)\n`;
  texto += `   y² = b² * (1 - x² / a²)\n`;
  texto += `   y = ± √[ b² * (1 - x² / a²) ]\n\n`;

  texto += `5) Mencionas el rango para x:\n`;
  texto += `   Para que y sea real, el término dentro de la raíz debe ser ≥ 0.\n`;
  texto += `   Por lo tanto, x está en el intervalo [-a, a].\n\n`;

  texto += `6) Calculamos y positivo y negativo para cada x en [-a, a] y dibujamos la elipse.\n`;

  output.textContent = texto;

  // Dibujar la elipse en canvas

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid(ctx, canvas.width, canvas.height, 20);
  drawAxis(ctx, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const maxSemieje = Math.max(a, b);
  const margin = 40;
  const scale = (canvas.width / 2 - margin) / maxSemieje;

  ctx.beginPath();
  for (let x = -a; x <= a; x += 0.01) {
    let val = 1 - (x * x) / (a * a);
    if (val < 0) continue;
    let y = Math.sqrt(b * b * val);
    let canvasX = centerX + x * scale;
    let canvasY = centerY - y * scale;

    if (x === -a) {
      ctx.moveTo(canvasX, canvasY);
    } else {
      ctx.lineTo(canvasX, canvasY);
    }
  }

  for (let x = a; x >= -a; x -= 0.01) {
    let val = 1 - (x * x) / (a * a);
    if (val < 0) continue;
    let y = -Math.sqrt(b * b * val);
    let canvasX = centerX + x * scale;
    let canvasY = centerY - y * scale;
    ctx.lineTo(canvasX, canvasY);
  }
  ctx.closePath();

  ctx.strokeStyle = "#0074D9";
  ctx.lineWidth = 3;
  ctx.stroke();
}

// Funciones de ayuda para ejes y cuadrícula quedan igual

function drawAxis(ctx, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.stroke();

  ctx.fillStyle = "#000";
  ctx.font = "12px Arial";
  const step = 40;
  for (let x = centerX; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, centerY - 5);
    ctx.lineTo(x, centerY + 5);
    ctx.stroke();
  }
  for (let x = centerX; x > 0; x -= step) {
    ctx.beginPath();
    ctx.moveTo(x, centerY - 5);
    ctx.lineTo(x, centerY + 5);
    ctx.stroke();
  }
  for (let y = centerY; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(centerX - 5, y);
    ctx.lineTo(centerX + 5, y);
    ctx.stroke();
  }
  for (let y = centerY; y > 0; y -= step) {
    ctx.beginPath();
    ctx.moveTo(centerX - 5, y);
    ctx.lineTo(centerX + 5, y);
    ctx.stroke();
  }
}

function drawGrid(ctx, width, height, spacing) {
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}
