#!/usr/bin/env node
/**
 * One-shot migration: download every Cloudinary asset referenced by the site
 * into `public/images/` as WebP. Run once, commit the new files, delete the
 * Cloudinary account whenever you're ready.
 *
 *   node scripts/migrate-from-cloudinary.mjs
 *
 * Idempotent: skips files that already exist on disk. Uses Cloudinary's
 * `f_webp,q_auto` so the downloaded bytes are already optimized — no local
 * Sharp/IPX step required.
 */
import { mkdir, writeFile, access, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_IMAGES = join(__dirname, '..', 'public', 'images')
const CLOUD = 'https://res.cloudinary.com/dumwa1w5x/image/upload'
const TRANSFORM = 'f_webp,q_auto' // single source of truth for output format

// Each entry: [cloudinary public_id, local path under public/images/]
const ASSETS = [
  // --- profile ---
  ['profile_ubnllm', 'profile/profile.webp'],

  // --- project thumbnails ---
  ['kourai-khryseai_nrxqnu', 'projects/kourai-khryseai.webp'],
  ['velocity-fl_dukewt', 'projects/velocity-fl.webp'],
  ['phalanx-fl_hlq7gn', 'projects/phalanx-fl.webp'],
  ['techne_m0vadx', 'projects/techne.webp'],
  ['ldqis_yz6hib', 'projects/ldqis.webp'],
  ['IntelliFL_r48xde', 'projects/intellifl.webp'],
  ['ses_mfbacm', 'projects/ses.webp'],
  ['robot_mesprt', 'projects/robot.webp'],
  ['control-robots_mtf8fl', 'projects/control-robots.webp'],
  ['triage_cxgfbo', 'projects/triage.webp'],
  ['bioradio_raazmn', 'projects/bioradio.webp'],
  ['blockchain_p5glwx', 'projects/blockchain.webp'],

  // --- blog article covers ---
  ['paper01_e0enws', 'blog/paper01.webp'],
  ['paper02_vj3kvk', 'blog/paper02.webp'],
  ['paper03_ikgpew', 'blog/paper03.webp'],
  ['tools_pclm7n', 'blog/tools.webp'],
  ['upskill_ovchzg', 'blog/upskill.webp'],

  // --- gallery (mirrors app/data/gallery.ts) ---
  ['alex_cbazpf', 'gallery/alex.webp'],
  ['art_ijfe8w', 'gallery/art.webp'],
  ['band_cwojac', 'gallery/band.webp'],
  ['band1_rukaur', 'gallery/band1.webp'],
  ['band2_tyauza', 'gallery/band2.webp'],
  ['blizzcon_fj7auv', 'gallery/blizzcon.webp'],
  ['cod-esports_hdaolu', 'gallery/cod-esports.webp'],
  ['brandnew_bl8gbs', 'gallery/brandnew.webp'],
  ['brooke_dh69pn', 'gallery/brooke.webp'],
  ['christina_icrweu', 'gallery/christina.webp'],
  ['con2_u3wftt', 'gallery/con2.webp'],
  ['con3_vmsiui', 'gallery/con3.webp'],
  ['con4_qjyyvf', 'gallery/con4.webp'],
  ['con5_eatmzj', 'gallery/con5.webp'],
  ['con6_emihbp', 'gallery/con6.webp'],
  ['con7_m9qpad', 'gallery/con7.webp'],
  ['fabian_jowtgo', 'gallery/fabian.webp'],
  ['face1_lkxhtx', 'gallery/face1.webp'],
  ['face2_hdu6si', 'gallery/face2.webp'],
  ['face3_xyd7sb', 'gallery/face3.webp'],
  ['face4_b0osir', 'gallery/face4.webp'],
  ['fam_ebffjt', 'gallery/fam.webp'],
  ['fam2_rbyxsl', 'gallery/fam2.webp'],
  ['games_ef5uts', 'gallery/games.webp'],
  ['muzzies_wrfudl', 'gallery/muzzies.webp'],
  ['tori_lzo0e1', 'gallery/tori.webp'],
  ['tori2_nbdj8h', 'gallery/tori2.webp'],
  ['uncle_morda8', 'gallery/uncle.webp'],
  ['vote_hdqimk', 'gallery/vote.webp'],
  ['vote1_wsnidg', 'gallery/vote1.webp'],
  ['youth_x7hjkw', 'gallery/youth.webp'],
  ['jens-wedding-party_xj1oun', 'gallery/jens-wedding-party.webp'],
  ['marmot-watching_udsqxa', 'gallery/marmot-watching.webp'],
  ['rainier-panorama_kfuhuc', 'gallery/rainier-panorama.webp'],
  ['rainier-hike_li5jii', 'gallery/rainier-hike.webp'],
  ['rainier-friends_a6srrr', 'gallery/rainier-friends.webp'],
  ['tatoosh-range_lhaexd', 'gallery/tatoosh-range.webp'],
  ['rainier-glaciers_pz1vdh', 'gallery/rainier-glaciers.webp'],
  ['rainier-selfie_kq1jao', 'gallery/rainier-selfie.webp'],
  ['rainier-trail_hfxdpq', 'gallery/rainier-trail.webp'],
  ['cascade-vista_gmr2v1', 'gallery/cascade-vista.webp'],
  ['rainier-ridge_d64qmg', 'gallery/rainier-ridge.webp'],
  ['rainier-summit_ecn5pf', 'gallery/rainier-summit.webp'],
  ['rainier-group_imqmdt', 'gallery/rainier-group.webp'],
  ['paradise-valley_wabbcj', 'gallery/paradise-valley.webp'],
  ['paradise-descent_oisbub', 'gallery/paradise-descent.webp'],
  ['rainier-meadow_cwzc9x', 'gallery/rainier-meadow.webp'],
  ['paradise-meadow_hh1qrz', 'gallery/paradise-meadow.webp'],
  ['jens-wedding-break_wbuddz', 'gallery/jens-wedding-break.webp'],
  ['jens-wedding-toast_kc1rng', 'gallery/jens-wedding-toast.webp'],
  ['wedding-group-toast_l5kl9g', 'gallery/wedding-group-toast.webp'],
  ['wedding-reception-dinner_afytut', 'gallery/wedding-reception-dinner.webp'],
  ['wedding-poolside-night_bp2hnq', 'gallery/wedding-poolside-night.webp'],
  ['jens-groomsmen_hyxjqc', 'gallery/jens-groomsmen.webp'],
  ['wedding-boys-table_twyulr', 'gallery/wedding-boys-table.webp'],
  ['wedding-groom-prep_f5yrlc', 'gallery/wedding-groom-prep.webp'],
  ['wedding-getting-dressed_i8s9wz', 'gallery/wedding-getting-dressed.webp'],
  ['rainier-tatoosh-trail_xmxyhk', 'gallery/rainier-tatoosh-trail.webp'],
  ['rainier-trail-duo_j9ixld', 'gallery/rainier-trail-duo.webp'],
  ['rainier-snow-break_ovosoa', 'gallery/rainier-snow-break.webp'],
  ['rainier-couple-selfie_tteou5', 'gallery/rainier-couple-selfie.webp'],
  ['rainier-summit-couple_ap1nih', 'gallery/rainier-summit-couple.webp'],
  ['rainier-stream_ojzhan', 'gallery/rainier-stream.webp'],
  ['rainier-group-trail_qgh4mf', 'gallery/rainier-group-trail.webp'],
  ['rainier-group-mountain_y0szpb', 'gallery/rainier-group-mountain.webp'],
  ['rainier-summit-pano_qm9kj9', 'gallery/rainier-summit-pano.webp'],
  ['rainier-glacier-approach_thskxh', 'gallery/rainier-glacier-approach.webp'],
  ['patio-drinks_aznxzk', 'gallery/patio-drinks.webp'],
  ['road-trip-car_wo61sb', 'gallery/road-trip-car.webp'],
  ['escape-room-fun_gqngwc', 'gallery/escape-room-fun.webp'],
  ['korean-bbq-spread_exwifw', 'gallery/korean-bbq-spread.webp'],
  ['seattle-rooftop-sunset_mikowt', 'gallery/seattle-rooftop-sunset.webp'],
  ['deck-gathering_sxrxyq', 'gallery/deck-gathering.webp'],
  ['korean-bbq-dinner_jv0ixu', 'gallery/korean-bbq-dinner.webp'],
  ['brunch-spread_katfcm', 'gallery/brunch-spread.webp'],
  ['living-room-hangout_supk2j', 'gallery/living-room-hangout.webp'],
  ['rooftop-dinner_a8bxmg', 'gallery/rooftop-dinner.webp'],
  ['sunset-photographer_eoh5pu', 'gallery/sunset-photographer.webp'],
  ['seattle-sculpture_mxqwiv', 'gallery/seattle-sculpture.webp'],
  ['pfp-2024_ergu7t', 'gallery/pfp-2024.webp'],
  ['pfp-2025_qdtqen', 'gallery/pfp-2025.webp']
]

const CONCURRENCY = 8

const exists = async (path) => {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

const download = async ([publicId, dest]) => {
  const out = join(PUBLIC_IMAGES, dest)
  if (await exists(out)) {
    const { size } = await stat(out)
    return { dest, status: 'skip', bytes: size }
  }
  await mkdir(dirname(out), { recursive: true })
  const url = `${CLOUD}/${TRANSFORM}/${publicId}`
  const res = await fetch(url, { headers: { Accept: 'image/webp' } })
  if (!res.ok) {
    return { dest, status: 'fail', bytes: 0, err: `HTTP ${res.status}` }
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(out, buf)
  return { dest, status: 'ok', bytes: buf.length }
}

// Simple bounded-concurrency runner
async function run() {
  console.log(`Downloading ${ASSETS.length} assets from Cloudinary → public/images/`)
  const results = []
  let i = 0
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (i < ASSETS.length) {
      const idx = i++
      const r = await download(ASSETS[idx]).catch((err) => ({
        dest: ASSETS[idx][1],
        status: 'fail',
        bytes: 0,
        err: err.message
      }))
      results.push(r)
      const icon = r.status === 'ok' ? '✓' : r.status === 'skip' ? '·' : '✗'
      const kb = (r.bytes / 1024).toFixed(1).padStart(7)
      const tail = r.err ? `  (${r.err})` : ''
      console.log(`${icon} ${kb} KB  ${r.dest}${tail}`)
    }
  })
  await Promise.all(workers)

  const ok = results.filter((r) => r.status === 'ok').length
  const skip = results.filter((r) => r.status === 'skip').length
  const fail = results.filter((r) => r.status === 'fail').length
  const totalBytes = results.reduce((a, r) => a + r.bytes, 0)
  console.log(
    `\nDone. ok=${ok}  skip=${skip}  fail=${fail}  total=${(totalBytes / 1024 / 1024).toFixed(2)} MB`
  )
  if (fail) process.exit(1)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
