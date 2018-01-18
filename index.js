module.exports = function nearest(brandColors, color) {
  const hue = color.hue();

  if (Object.keys(brandColors).length === 0) return null;

  const nearestKey = Object.keys(brandColors).reduce((lastFound, key) => {
    if (brandColors[key].hue() === hue) return key;
    return lastFound;
  }, Object.keys(brandColors)[0]);

  const result = { color: nearestKey };

  const d = delta(brandColors[nearestKey], color);
  if (d < 0) {
    result.shade = shade(brandColors[nearestKey], color);
  }
  if (d > 0) {
    result.tint = tint(brandColors[nearestKey], color);
  }

  return result;
};

function delta(base, target) {
  return target.lightness() - base.lightness();
}

function shade(base, target) {
  const baseShade = base.lightness();
  const targetShade = target.lightness();
  return parseFloat((1 - targetShade / baseShade).toFixed(2));
}

function tint(base, target) {
  const baseShade = base.lightness();
  const targetShade = target.lightness();
  return parseFloat(((targetShade - baseShade) / (100 - baseShade)).toFixed(2));
}
