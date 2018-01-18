// Identifies the brand color with the nearest hue to color, then
// calculates the right percent of white or black to add to it to get
// a color closest to color.
module.exports = function nearest(brandColors, color) {
  if (Object.keys(brandColors).length === 0) return null;

  const { bestMatch } = Object.keys(brandColors).reduce(
    ({ bestMatch, minDelta }, key) => {
      const delta = hueDelta(brandColors[key], color);
      return delta < minDelta
        ? { bestMatch: key, minDelta: delta }
        : { bestMatch, minDelta };
    },
    { bestMatch: Object.keys(brandColors)[0], minDelta: 180 }
  );

  const result = { color: bestMatch };

  const d = delta(brandColors[bestMatch], color);
  if (d < 0) {
    result.shade = shade(brandColors[bestMatch], color);
  }
  if (d > 0) {
    result.tint = tint(brandColors[bestMatch], color);
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

function hueDelta(color1, color2) {
  // See https://stackoverflow.com/a/7869457
  const mod = (a, n) => a - Math.floor(a / n) * n; // unlike %, always positive
  return Math.abs(mod(color1.hue() - color2.hue() + 180, 360) - 180);
}
