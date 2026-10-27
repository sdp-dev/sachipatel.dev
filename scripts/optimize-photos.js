import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS_DIR = join(__dirname, '../src/assets/photos');
const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];

const files = readdirSync(PHOTOS_DIR).filter(f => EXTS.includes(extname(f)));

for (const file of files) {
  const filepath = join(PHOTOS_DIR, file);
  const sizeBefore = statSync(filepath).size;

  const buf = await sharp(filepath)
    .rotate()  // auto-rotate from EXIF, then strip EXIF
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 75, mozjpeg: true })
    .toBuffer();

  writeFileSync(filepath, buf);
  const saved = (((sizeBefore - buf.length) / sizeBefore) * 100).toFixed(0);
  console.log(`✓ ${file}: ${(sizeBefore/1024/1024).toFixed(1)}MB → ${(buf.length/1024/1024).toFixed(1)}MB (-${saved}%)`);
}

console.log('\nDone!');
