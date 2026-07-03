const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "uploads", "ce-oferim.png");
const OUT_DARK_BG = path.join(__dirname, "..", "public", "uploads", "ce-oferim-dark.png");
const OUT_LIGHT_BG = path.join(__dirname, "..", "public", "uploads", "ce-oferim-transparent.png");

const SATURATION_THRESHOLD = 22;

// Variant 1 — for dark section backgrounds: grayscale pixels (bg, text, arrows,
// socket) become WHITE with alpha derived from lightness. Saturated pixels
// (pastel quadrant fills + colored icons) are left untouched.
async function makeDarkBgVariant() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max - min < SATURATION_THRESHOLD) {
      const lightness = (r + g + b) / 3;
      data[i] = 255; data[i + 1] = 255; data[i + 2] = 255;
      data[i + 3] = Math.max(0, Math.min(255, Math.round(255 - lightness)));
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT_DARK_BG);
  console.log("Written:", OUT_DARK_BG);
}

// Variant 2 — for light section backgrounds: only cut out the near-white
// background (alpha fades to 0 at pure white). Every other pixel — dark text,
// gray socket lines, colored icons — keeps its exact original color.
async function makeLightBgVariant() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lightness = (r + g + b) / 3;
    if (lightness >= 255) {
      data[i + 3] = 0;
    } else if (lightness > 245) {
      data[i + 3] = Math.round(255 - ((lightness - 245) / 10) * 255);
    }
    // else: keep original color + full opacity
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT_LIGHT_BG);
  console.log("Written:", OUT_LIGHT_BG);
}

async function main() {
  await makeDarkBgVariant();
  await makeLightBgVariant();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
