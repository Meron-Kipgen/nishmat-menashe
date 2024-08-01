const gradientsCache = new Map();

const generateGradient = (identifier) => {
  if (!gradientsCache.has(identifier)) {
    const hash = hashCode(identifier);
    const angle = hash % 360;
    const color1 = getColorFromHash(hash, 0);
    const color2 = getColorFromHash(hash, 1);
    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    gradientsCache.set(identifier, gradient);
  }
  return gradientsCache.get(identifier);
};

const getColorFromHash = (hash, index) => {
  const hue = (hash + index * 100) % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const hashCode = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export { generateGradient };
