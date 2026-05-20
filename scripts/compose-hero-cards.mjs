import sharp from 'sharp'
import { mkdirSync, statSync } from 'fs'

const OUT_DIR = 'public/images/projects'
mkdirSync(OUT_DIR, { recursive: true })

const BG_SRC = 'design-assets/hero-background.png'
const CARD_W = 960
const CARD_H = 540
const HERO_TARGET_HEIGHT = 480

const bgBuf = await sharp(BG_SRC)
  .resize({ width: CARD_W, height: CARD_H, fit: 'cover' })
  .png()
  .toBuffer()

const projects = [
  {
    src: '/home/ajbar/ajsoftworks/kourai-khryseai/docs/assets/golden-maidens.png',
    out: `${OUT_DIR}/kourai-khryseai.webp`
  },
  {
    src: '/home/ajbar/ajsoftworks/vFL/docs/assets/velocity-hero.png',
    out: `${OUT_DIR}/velocity-fl.webp`
  },
  {
    src: '/home/ajbar/ajsoftworks/phalanx-fl/docs/assets/phalanx-hero.png',
    out: `${OUT_DIR}/phalanx-fl.webp`
  },
  { src: '/home/ajbar/ajsoftworks/techne/docs/assets/hero.png', out: `${OUT_DIR}/techne.webp` }
]

function featherMask(width, height) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <radialGradient id="m" cx="50%" cy="50%" r="71%">
          <stop offset="0%" stop-color="white" stop-opacity="1"/>
          <stop offset="55%" stop-color="white" stop-opacity="1"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#m)"/>
    </svg>`
  )
}

const results = []
for (const p of projects) {
  const resized = await sharp(p.src)
    .resize({ height: HERO_TARGET_HEIGHT, withoutEnlargement: false })
    .ensureAlpha()
    .png()
    .toBuffer()

  const { width, height } = await sharp(resized).metadata()
  const feathered = await sharp(resized)
    .composite([{ input: featherMask(width, height), blend: 'dest-in' }])
    .png()
    .toBuffer()

  await sharp(bgBuf)
    .composite([{ input: feathered, gravity: 'center' }])
    .webp({ quality: 88, effort: 6 })
    .toFile(p.out)

  const after = statSync(p.out).size
  const meta = await sharp(p.out).metadata()
  results.push({
    file: p.out,
    dims: `${meta.width}x${meta.height}`,
    sizeKB: Math.round(after / 1024)
  })
}

console.log(JSON.stringify(results, null, 2))
