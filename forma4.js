function resolverTransformacion() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const h = parseFloat(document.getElementById("h").value);
  const k = parseFloat(document.getElementById("k").value);
  const grados = parseFloat(document.getElementById("θ").value);

  if (isNaN(a) || isNaN(b)) {
    alert("Por favor ingresa valores numéricos válidos para a y b.");
    return;
  }
  if (isNaN(h)) { alert("Ingresa valor numérico válido para h."); return; }
  if (isNaN(k)) { alert("Ingresa valor numérico válido para k."); return; }
  if (isNaN(grados)) { alert("Ingresa valor numérico válido para θ."); return; }

  const θ = grados * Math.PI / 180; // Convertir a radianes
  const cosθ = Math.cos(θ);
  const senθ = Math.sin(θ);

  let texto = "";

  // 1. Fórmula general de elipse sin rotación y centrada
  texto += "1. Ecuación canónica de la elipse centrada en el origen:\n";
  texto += `   (x² / ${a ** 2}) + (y² / ${b ** 2}) = 1\n\n`;

  // 2. Rotación y desplazamiento
  texto += "2. Aplicamos rotación θ y desplazamiento (h, k):\n";
  texto += "   Rotación de coordenadas:\n";
  texto += "     x = X cos(θ) - Y sen(θ)\n";
  texto += "     y = X sen(θ) + Y cos(θ)\n";
  texto += "   Donde (X, Y) es el sistema rotado.\n";
  texto += "   Desplazamos el centro: x → x - h, y → y - k\n\n";

  // 3. Sustitución en la ecuación de la elipse
  texto += "3. Sustituyendo x y y en la ecuación:\n";
  texto += `   (( (X cosθ - Y senθ) - h )² ) / ${a ** 2} + (( (X senθ + Y cosθ) - k )² ) / ${b ** 2} = 1\n\n`;

  // 4. Valores numéricos de sen y cos θ
  texto += "4. Valores numéricos:\n";
  texto += `   θ = ${grados}° = ${θ.toFixed(4)} rad\n`;
  texto += `   cos(θ) = ${cosθ.toFixed(4)}\n`;
  texto += `   sen(θ) = ${senθ.toFixed(4)}\n\n`;

  // 5. Interpretación
  texto += "5. Interpretación:\n";
  texto += `   Centro de la elipse: (${h}, ${k})\n`;
  texto += `   Orientación (ángulo de rotación): ${grados}°\n`;
  texto += `   Semiejes:\n`;
  texto += `     Semi-eje mayor a = ${a}\n`;
  texto += `     Semi-eje menor b = ${b}\n\n`;

  texto += "   Esta es la elipse trasladada y rotada según los parámetros indicados.\n";

  document.getElementById("output").textContent = texto;

  // --- Dibujo plano cartesiano con ejes ---

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const width = canvas.width;
  const height = canvas.height;

  // Centro del canvas en el origen cartesiano (ejes)
  const cx = width / 2;
  const cy = height / 2;

  // Escala: pixeles por unidad (ajustar según tamaño de semiejes)
  const scale = 20;

  // Dibujar ejes coordenados
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  // eje X
  ctx.moveTo(0, cy);
  ctx.lineTo(width, cy);
  // eje Y
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, height);
  ctx.stroke();

  // Marcas en ejes cada unidad
  ctx.fillStyle = "black";
  ctx.font = "10px monospace";
  for (let i = -10; i <= 10; i++) {
    // marcas eje X
    ctx.beginPath();
    ctx.moveTo(cx + i * scale, cy - 5);
    ctx.lineTo(cx + i * scale, cy + 5);
    ctx.stroke();
    if(i !== 0) ctx.fillText(i, cx + i * scale - 3, cy + 15);

    // marcas eje Y
    ctx.beginPath();
    ctx.moveTo(cx - 5, cy - i * scale);
    ctx.lineTo(cx + 5, cy - i * scale);
    ctx.stroke();
    if(i !== 0) ctx.fillText(i, cx + 8, cy - i * scale + 3);
  }

  // Dibujar elipse con la transformación

  // Para cada punto paramétrico t, calcular la elipse transformada
  // x = h + a cos(t) cosθ - b sin(t) senθ
  // y = k + a cos(t) senθ + b sin(t) cosθ

  ctx.beginPath();
  ctx.strokeStyle = "#0074d9";
  ctx.lineWidth = 2;

  const steps = 200; // número de puntos para la curva
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);

    // Coordenadas transformadas
    const x = h + a * cosT * cosθ - b * sinT * senθ;
    const y = k + a * cosT * senθ + b * sinT * cosθ;

    const px = cx + x * scale;
    const py = cy - y * scale;

    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();

  // Centro de la elipse dibujado
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(cx + h * scale, cy - k * scale, 4, 0, 2 * Math.PI);
  ctx.fill();

  // Leyenda centro
  ctx.fillStyle = "black";
  ctx.font = "12px monospace";
  ctx.fillText(`Centro (${h.toFixed(2)}, ${k.toFixed(2)})`, cx + h * scale + 6, cy - k * scale - 6);
}
