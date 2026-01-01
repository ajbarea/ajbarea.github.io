# Gallery Image Workflow

## Quick Start

1. Drop new images into `public/images/to-do/`
2. Ask Claude to process them for the gallery

## Manual Processing

### Create full-size (max 2000px):
```bash
npx sharp-cli -i "public/images/to-do/ORIGINAL.jpg" -o "public/images/gallery/full/" -f jpg -q 85 resize 2000 2000 --fit inside --withoutEnlargement
mv "public/images/gallery/full/ORIGINAL.jpg" "public/images/gallery/full/NEW-NAME.jpg"
```

### Create thumbnail (max 250px):
```bash
npx sharp-cli -i "public/images/to-do/ORIGINAL.jpg" -o "public/images/gallery/" -f jpg -q 80 resize 250 250 --fit inside --withoutEnlargement
mv "public/images/gallery/ORIGINAL.jpg" "public/images/gallery/NEW-NAME-thumb.jpg"
```

### For HEIC-converted images (use --autoOrient):
```bash
npx sharp-cli --autoOrient -i "public/images/to-do/ORIGINAL.jpeg" -o "public/images/gallery/full/" -f jpg -q 85 resize 2000 2000 --fit inside --withoutEnlargement
```

### Get dimensions (for gallery.ts):
```bash
node -e "
const fs = require('fs');
const buffer = fs.readFileSync('public/images/gallery/full/NEW-NAME.jpg');
let i = 2;
while (i < buffer.length) {
  if (buffer[i] !== 0xFF) break;
  const marker = buffer[i + 1];
  if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
    console.log(buffer.readUInt16BE(i + 7) + 'x' + buffer.readUInt16BE(i + 5));
    break;
  }
  i += 2 + buffer.readUInt16BE(i + 2);
}
"
```

### Add to `app/data/gallery.ts`:
```ts
{
  id: 'new-name',
  thumbnailUrl: '/images/gallery/new-name-thumb.jpg',
  fullUrl: '/images/gallery/full/new-name.jpg',
  width: WIDTH,
  height: HEIGHT,
  alt: 'Description for accessibility',
  caption: 'Caption text'
}
```

## Notes

- **Naming**: Use kebab-case (e.g., `beach-sunset`, `birthday-party`)
- **HEIC files**: Convert to JPEG first, then use `--autoOrient` flag
- **Large images (>7900px)**: Resize before Claude can view them
- **Dependencies**: `sharp` is in devDependencies for this workflow
