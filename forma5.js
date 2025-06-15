function resolverElipse() {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const h = parseFloat(document.getElementById('h').value);
  const k = parseFloat(document.getElementById('k').value);
  const thetaDeg = parseFloat(document.getElementById('theta').value);

  const output = document.getElementById('output');
  output.textContent = '';

  if (isNaN(a) || isNaN(b) || isNaN(h) || isNaN(k) || isNaN(thetaDeg) || a <= 0 || b <= 0) {
    output.textContent = 'Por favor ingresa valores válidos para todos los parámetros (a,b > 0).';
    return;
  }

  // Paso 1: fórmula general de la elipse rotada con desplazamientos:
  // Ecuación paramétrica rotada y trasladada:
  // x = h + a*cos(t)*cosθ - b*sin(t)*sinθ
  // y = k + a*cos(t)*sinθ + b*sin(t)*cosθ

  // Paso 2: fórmula implícita general:
  // ( ( (x - h)cosθ + (y - k)sinθ )² ) / a² + ( ( (x - h)sinθ - (y - k)cosθ )² ) / b² = 1

  // Paso 3: Cálculo sen y cos
  const thetaRad = thetaDeg * Math.PI / 180;
  const cosT = Math.cos(thetaRad);
  const sinT = Math.sin(thetaRad);

  let texto = '';

  texto += `1) Fórmula general implícita de la elipse rotada con desplazamientos:\n\n`;
  texto += `[( (x - h) * cosθ + (y - k) * sinθ )² ] / a² + [( (x - h) * sinθ - (y - k) * cosθ )² ] / b² = 1\n\n`;

  texto += `2) Sustituyendo valores:\n`;
  texto += `a = ${a}, b = ${b}, h = ${h}, k = ${k}, θ = ${thetaDeg}°\n`;
  texto += `θ en radianes = ${thetaRad.toFixed(4)}\n\n`;

  texto += `3) Valores trigonométricos:\n`;
  texto += `cos(θ) = ${cosT.toFixed(4)}\n`;
  texto += `sin(θ) = ${sinT.toFixed(4)}\n\n`;

  texto += `4) Ecuación implícita con valores numéricos:\n\n`;
  texto += `[ ( (x - ${h.toFixed(2)}) * ${cosT.toFixed(4)} + (y - ${k.toFixed(2)}) * ${sinT.toFixed(4)} )² ] / ${a.toFixed(2)}² +\n`;
  texto += `[ ( (x - ${h.toFixed(2)}) * ${sinT.toFixed(4)} - (y - ${k.toFixed(2)}) * ${cosT.toFixed(4)} )² ] / ${b.toFixed(2)}² = 1\n\n`;

  texto += `5) Interpretación:\n`;
  texto += `- Centro: (${h}, ${k})\n`;
  texto += `- Semieje mayor (a): ${a}\n`;
  texto += `- Semieje menor (b): ${b}\n`;
  texto += `- Ángulo de rotación: ${thetaDeg}°\n\n`;

  texto += `6) Parámetros para graficar:\n`;
  texto += `Usamos la forma paramétrica:\n`;
  texto += `x(t) = h + a*cos(t)*cosθ - b*sin(t)*sinθ\n`;
  texto += `y(t) = k + a*cos(t)*sinθ + b*sin(t)*cosθ\n`;
  texto += `donde t va de 0 a 2π\n\n`;

  output.textContent = texto;

  // Graficar la elipse
  graficarElipse(a, b, h, k, cosT, sinT);
}

function graficarElipse(a, b, h, k, cosT, sinT) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Definimos el origen en el centro del canvas (para coordenadas cartesianos)
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  // Escala para ajustar la elipse en el canvas
  // Suponemos un factor de escala que permita que los ejes quepan cómodamente
  const escala = Math.min(cx / (a + Math.abs(h) + 1), cy / (b + Math.abs(k) + 1)) * 0.9;

  // Ejes
  ctx.strokeStyle = '#bbb';
  ctx.lineWidth = 1;

  // Dibujar ejes X y Y
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(canvas.width, cy);
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, canvas.height);
  ctx.stroke();

  // Dibujar la elipse con forma paramétrica
  ctx.beginPath();
  const pasos = 200;
  for (let i = 0; i <= pasos; i++) {
    const t = (i / pasos) * 2 * Math.PI;
    const x = h + a * Math.cos(t) * cosT - b * Math.sin(t) * sinT;
    const y = k + a * Math.cos(t) * sinT + b * Math.sin(t) * cosT;

    // Convertir a pixeles en canvas (invertir y)
    const px = cx + x * escala;
    const py = cy - y * escala;

    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();

  ctx.strokeStyle = '#0074d9';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Dibujar centro
  ctx.fillStyle = 'red';
  ctx.beginPath();
  const centroX = cx + h * escala;
  const centroY = cy - k * escala;
  ctx.arc(centroX, centroY, 4, 0, 2 * Math.PI);
  ctx.fill();
}
