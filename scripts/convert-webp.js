import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const imgDir = path.resolve("public/img");

if (!fs.existsSync(imgDir)) {
  console.error("Directory not found:", imgDir);
  process.exit(1);
}

const targetArg = process.argv[2];
const files = fs.readdirSync(imgDir);
let convertedCount = 0;

for (const file of files) {
  if (file === "trash" || file.startsWith(".")) continue;

  const isRaster = /\.(png|jpe?g)$/i.test(file);
  if (!isRaster) continue;

  const baseName = file.replace(/\.[^/.]+$/, "");
  if (targetArg && !baseName.toLowerCase().includes(targetArg.toLowerCase())) {
    continue;
  }

  const inputPath = path.join(imgDir, file);
  const outputPath = path.join(imgDir, `${baseName}.webp`);

  const statInput = fs.statSync(inputPath);
  const shouldConvert =
    !fs.existsSync(outputPath) ||
    statInput.mtimeMs > fs.statSync(outputPath).mtimeMs;

  if (shouldConvert) {
    try {
      const meta = await sharp(inputPath).metadata();
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      const statOutput = fs.statSync(outputPath);
      const origSize = Math.round(statInput.size / 1024);
      const webpSize = Math.round(statOutput.size / 1024);
      const ratio = Math.round((1 - statOutput.size / statInput.size) * 100);

      console.log(
        `✓ Converted: ${file} (${meta.width}x${meta.height}) -> ${baseName}.webp [${origSize}KB -> ${webpSize}KB, -${ratio}%]`
      );
      convertedCount++;
    } catch (err) {
      console.error(`✗ Error converting ${file}:`, err.message);
    }
  }
}

if (convertedCount === 0) {
  console.log("All WebP images in public/img/ are up to date.");
} else {
  console.log(`Successfully converted ${convertedCount} image(s) to WebP.`);
}
