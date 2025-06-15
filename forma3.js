function resolverElipse() {
  const A = parseFloat(document.getElementById("A").value);
  const B = parseFloat(document.getElementById("B").value);
  const C = parseFloat(document.getElementById("C").value);
  const D = parseFloat(document.getElementById("D").value);
  const E = parseFloat(document.getElementById("E").value);

  const output = document.getElementById("output");
  output.textContent = "";

  if (!A || !B) {
    output.textContent = "Los coeficientes A y B deben ser distintos de cero para una elipse.";
    return;
  }

  const xh = -C / (2 * A);
  const yk = -D / (2 * B);

  // Cambiar aquí -F por -E (término independiente)
  const rightSide = -E + (A * Math.pow(C / (2 * A), 2)) + (B * Math.pow(D / (2 * B), 2));

  if (rightSide <= 0) {
    output.textContent = "La ecuación no representa una elipse real (lado derecho <= 0).";
    limpiarCanvas();
    return;
  }

  const aSquared = rightSide / A;
  const bSquared = rightSide / B;

  const a = Math.sqrt(aSquared);
  const b = Math.sqrt(bSquared);

  let texto = "";
  texto += "Fórmula general: A x² + B y² + C x + D y + E = 0\n\n";
  texto += `Coeficientes:\nA = ${A}\nB = ${B}\nC = ${C}\nD = ${D}\nE = ${E}\n\n`;

  texto += "Paso 1: Completar cuadrados para x y y:\n";
  texto += `x: A(x² + (${C}/${A})x) = A[(x + ${round(xh,4)})² - (${round(C,4)}²) / (4 * ${round(A,4)}²)]\n`;
  texto += `y: B(y² + (${D}/${B})y) = B[(y + ${round(yk,4)})² - (${round(D,4)}²) / (4 * ${round(B,4)}²)]\n\n`;

  texto += "Paso 2: Trasladar términos y reorganizar:\n";
  texto += `A(x + ${round(xh,4)})² + B(y + ${round(yk,4)})² = -E + A(${round(C / (2 * A),4)})² + B(${round(D / (2 * B),4)})²\n`;
  texto += `= ${round(rightSide,4)}\n\n`;

  texto += "Paso 3: Dividir toda la ecuación por el lado derecho para normalizar:\n";
  texto += `(x + ${round(xh,4)})² / ${round(aSquared,4)} + (y + ${round(yk,4)})² / ${round(bSquared,4)} = 1\n\n`;

  texto += `Semiejes:\na = ${round(a,4)}\nb = ${round(b,4)}\n\n`;

  texto += "Ecuación de la elipse en forma estándar:\n";
  texto += `(x - (${round(-xh,4)}))² / ${round(aSquared,4)} + (y - (${round(-yk,4)}))² / ${round(bSquared,4)} = 1\n\n`;

  texto += "Rango para x:\n";
  texto += `${round(-xh - a,4)} ≤ x ≤ ${round(-xh + a,4)}\n\n`;

  output.textContent = texto;

  graficarElipse(xh, yk, a, b);
}


function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function graficarElipse(h, k, a, b) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  limpiarCanvas();

  const width = canvas.width;
  const height = canvas.height;

  // Origen en el centro del canvas
  ctx.translate(width / 2, height / 2);

  // Escala para que a y b se vean bien (ajustar si quieres)
  const scale = 50;

  // Dibujar ejes
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 1;

  // Eje X
  ctx.beginPath();
  ctx.moveTo(-width / 2, 0);
  ctx.lineTo(width / 2, 0);
  ctx.stroke();

  // Eje Y
  ctx.beginPath();
  ctx.moveTo(0, -height / 2);
  ctx.lineTo(0, height / 2);
  ctx.stroke();

  // Dibujar elipse
  ctx.strokeStyle = "#0b1a34";
  ctx.lineWidth = 3;
  ctx.beginPath();

  // Dibujar la elipse con ctx.ellipse
  ctx.ellipse(
    h * scale,   // centro x traslación
    -k * scale,  // centro y traslación (invertido eje y)
    a * scale,   // radio en x
    b * scale,   // radio en y
    0,           // rotación
    0,
    2 * Math.PI
  );
  ctx.stroke();

  // Volver a origen para que no se acumulen transformaciones
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function limpiarCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
