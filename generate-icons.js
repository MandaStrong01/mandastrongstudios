// SVG-based icon generator for MandaStrong Studio
import { writeFileSync } from 'fs';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
  const padding = size * 0.15;
  const innerSize = size - padding * 2;
  const fontSize = size * 0.4;
  const sparkleSize = size * 0.05;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Purple background -->
  <rect width="${size}" height="${size}" fill="#7c3aed"/>

  <!-- Black inner square -->
  <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" fill="#000000"/>

  <!-- MS Text -->
  <text x="${size/2}" y="${size/2}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="#7c3aed" text-anchor="middle" dominant-baseline="middle">MS</text>

  <!-- Sparkle -->
  <circle cx="${size * 0.75}" cy="${size * 0.25}" r="${sparkleSize}" fill="#ffffff"/>
</svg>`;

  writeFileSync(`public/icon-${size}x${size}.svg`, svg);
  console.log(`Generated icon-${size}x${size}.svg`);
});

console.log('\nAll icons generated! For PNG versions, you can:');
console.log('1. Open public/icon-generator.html in a browser');
console.log('2. Right-click each canvas and save as PNG');
console.log('3. Or use an SVG-to-PNG converter on the generated SVG files');
