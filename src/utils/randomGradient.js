const gradientsCache = new Map();

const hashCode = (str) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
};

const getColorFromHash = (hash, index) => {
  const hue = (hash + index * 137) % 360; // Ensure a wide range of hues
  const saturation = 70 + (hash % 20);    // Ensure saturation is within range
  const lightness = 60 + (hash % 10);     // Ensure lightness is within range
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const generateGradient = (identifier) => {
  if (!gradientsCache.has(identifier)) {
    const hash = hashCode(identifier);
    const angle = (hash % 360); // Angle between 0 and 360 degrees
    const color1 = getColorFromHash(hash, 0);
    const color2 = getColorFromHash(hash, 1);
    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

    gradientsCache.set(identifier, gradient);
  }
  return gradientsCache.get(identifier);
};

export { generateGradient };
