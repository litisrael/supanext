export const generateRandomColor = () => {
  // Generate random values for RGB components
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Function to ensure contrast by adjusting brightness
  const adjustForContrast = (colorValue) => {
    return colorValue < 128 ? colorValue + 64 : colorValue - 64;
  };

  const rAdjusted = adjustForContrast(r);
  const gAdjusted = adjustForContrast(g);
  const bAdjusted = adjustForContrast(b);

  // Convert RGB values to a hexadecimal color code
  return `#${rAdjusted.toString(16).padStart(2, '0')}${gAdjusted.toString(16).padStart(2, '0')}${bAdjusted.toString(16).padStart(2, '0')}`;
};
