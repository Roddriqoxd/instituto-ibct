export function generarHoras(inicio: string, fin: string): { label: string, value: string }[] {
  const result = [];
  let [h, m] = inicio.split(':').map(Number);
  const [endH, endM] = fin.split(':').map(Number);

  while (h < endH || (h === endH && m <= endM)) {
    const label = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    result.push({label, value: label});
    m += 30;
    if (m >= 60) {
      m = 0;
      h++;
    }
  }

  return result;
}
