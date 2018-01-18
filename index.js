module.exports = function nearest(brandColors, color) {
  const colorNumber = color.rgbNumber();

  if (Object.keys(brandColors).length === 0) return null;

  const nearestKey = Object.keys(brandColors).reduce((lastFound, key) => {
    if (brandColors[key].rgbNumber() === colorNumber) return key;
    return lastFound;
  }, Object.keys(brandColors)[0]);

  return { color: nearestKey };
};
