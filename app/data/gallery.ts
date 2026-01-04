import type { GalleryImage } from '~/types'

/**
 * Gallery images data
 * Images are served from Cloudinary CDN with automatic optimization
 * cloudinaryId is the public ID assigned by Cloudinary during upload
 * Research: https://console.cloudinary.com/app
 */
export const galleryImages: GalleryImage[] = [
  {
    id: 'alex',
    cloudinaryId: 'alex_cbazpf',
    width: 640,
    height: 480,
    alt: 'With Cope',
    caption: 'with Cope at The Goat House',
    location: 'Odessa, FL'
  },
  {
    id: 'art',
    cloudinaryId: 'art_ijfe8w',
    width: 960,
    height: 960,
    alt: "Brooke's artwork",
    caption: "with Brooke's artwork",
    location: 'Largo, FL'
  },
  {
    id: 'band',
    cloudinaryId: 'band_cwojac',
    width: 640,
    height: 640,
    alt: 'The Goat House',
    caption: 'playing bass with Jack on drums at The Goat House',
    location: 'Odessa, FL'
  },
  {
    id: 'band1',
    cloudinaryId: 'band1_rukaur',
    width: 600,
    height: 450,
    alt: "Neptune's Lounge show",
    caption:
      "with bandmates and fans at Neptune's Lounge - Sam, Nick, Jeremy, Fabian, Elena, AJ, Zayda, and JG",
    location: 'Tarpon Springs, FL'
  },
  {
    id: 'band2',
    cloudinaryId: 'band2_tyauza',
    width: 1106,
    height: 800,
    alt: 'Band promo shoot: Jack, Alex, Jason, and AJ',
    caption: 'band promo shoot - Jack (drums), Alex (guitar), Jason (vocals), AJ (bass)',
    location: 'Tarpon Springs, FL'
  },
  {
    id: 'blizzcon',
    cloudinaryId: 'blizzcon_fj7auv',
    width: 2048,
    height: 1152,
    alt: 'Valeera (World of Warcraft) cosplay',
    caption: 'with Valeera (World of Warcraft) at BlizzCon',
    location: 'Anaheim, CA'
  },
  {
    id: 'cod-esports',
    cloudinaryId: 'cod-esports_hdaolu',
    width: 1440,
    height: 2872,
    alt: 'Call of Duty esports',
    caption: 'with Jens and Brandon at a Call of Duty esports tournament',
    location: 'Atlanta, GA'
  },
  {
    id: 'brandnew',
    cloudinaryId: 'brandnew_bl8gbs',
    width: 960,
    height: 1280,
    alt: 'Brand New fan',
    caption: 'finally saw Brand New at the House of Blues',
    location: 'Orlando, FL'
  },
  {
    id: 'brooke',
    cloudinaryId: 'brooke_dh69pn',
    width: 1536,
    height: 2048,
    alt: 'With Brooke',
    caption: 'with Brooke at Countryside Christian Church',
    location: 'Clearwater, FL'
  },
  {
    id: 'christina',
    cloudinaryId: 'christina_icrweu',
    width: 480,
    height: 640,
    alt: 'Silly selfie with Christina eating food',
    caption: 'munchies with Tini',
    location: 'Tarpon Springs, FL'
  },
  {
    id: 'con2',
    cloudinaryId: 'con2_u3wftt',
    width: 1810,
    height: 1890,
    alt: 'San (Princess Mononoke) cosplay',
    caption: 'with San (Princess Mononoke) at MetroCon',
    location: 'Tampa, FL'
  },
  {
    id: 'con3',
    cloudinaryId: 'con3_vmsiui',
    width: 1520,
    height: 1889,
    alt: 'Bulma (Dragon Ball Z) cosplay',
    caption: 'with Bulma (Dragon Ball Z) at MetroCon',
    location: 'Tampa, FL'
  },
  {
    id: 'con4',
    cloudinaryId: 'con4_qjyyvf',
    width: 1364,
    height: 1890,
    alt: 'Ochaco Uraraka (My Hero Academia) cosplay',
    caption: 'with Ochaco Uraraka (My Hero Academia) at MetroCon',
    location: 'Tampa, FL'
  },
  {
    id: 'con5',
    cloudinaryId: 'con5_eatmzj',
    width: 1793,
    height: 1486,
    alt: 'Lightning and Serah (Final Fantasy XIII) cosplay',
    caption: 'with Lightning and Serah (Final Fantasy XIII) at MetroCon',
    location: 'Tampa, FL'
  },
  {
    id: 'con6',
    cloudinaryId: 'con6_emihbp',
    width: 1677,
    height: 1889,
    alt: 'Raphtalia (The Rising of the Shield Hero) cosplay',
    caption: 'with Raphtalia (The Rising of the Shield Hero) at MetroCon',
    location: 'Tampa, FL'
  },
  {
    id: 'con7',
    cloudinaryId: 'con7_m9qpad',
    width: 1810,
    height: 1490,
    alt: 'Illumi and Hisoka (Hunter x Hunter) cosplay',
    caption: 'with Illumi and Hisoka (Hunter x Hunter) at MetroCon',
    location: 'Tampa, FL'
  },
  {
    id: 'fabian',
    cloudinaryId: 'fabian_jowtgo',
    width: 453,
    height: 301,
    alt: 'With Fabian, 9th grade',
    caption: 'hanging out with Fabian at Countryside Mall',
    location: 'Clearwater, FL'
  },
  {
    id: 'face1',
    cloudinaryId: 'face1_lkxhtx',
    width: 720,
    height: 960,
    alt: 'Mirror selfie',
    caption: 'ready for another long drive',
    location: 'Largo, FL'
  },
  {
    id: 'face2',
    cloudinaryId: 'face2_hdu6si',
    width: 568,
    height: 960,
    alt: 'Mirror selfie',
    caption: 'triennial pfp update',
    location: 'Largo, FL'
  },
  {
    id: 'face3',
    cloudinaryId: 'face3_xyd7sb',
    width: 720,
    height: 405,
    alt: 'Boston, Massachusetts',
    caption: 'exploring Boston for the first time',
    location: 'Boston, MA'
  },
  {
    id: 'face4',
    cloudinaryId: 'face4_b0osir',
    width: 768,
    height: 1024,
    alt: 'Popeyes run',
    caption: 'fried chicken at Popeyes during a road trip',
    location: 'Atlanta, GA'
  },
  {
    id: 'fam',
    cloudinaryId: 'fam_ebffjt',
    width: 720,
    height: 960,
    alt: 'Family portrait',
    caption: 'family portrait from the 90s',
    location: 'Rochester, NY'
  },
  {
    id: 'fam2',
    cloudinaryId: 'fam2_rbyxsl',
    width: 3088,
    height: 2320,
    alt: 'Family dinner',
    caption: 'family dinner at Chopsticks buffet',
    location: 'Clearwater, FL'
  },
  {
    id: 'games',
    cloudinaryId: 'games_ef5uts',
    width: 717,
    height: 960,
    alt: 'Game Boy collection',
    caption: 'found my Game Boy collection',
    location: 'Rochester, NY'
  },
  {
    id: 'muzzies',
    cloudinaryId: 'muzzies_wrfudl',
    width: 960,
    height: 717,
    alt: 'Muzzies deli',
    caption: 'feeding the whole rowing team at Muzzies',
    location: 'Tarpon Springs, FL'
  },
  {
    id: 'tori',
    cloudinaryId: 'tori_lzo0e1',
    width: 480,
    height: 640,
    alt: 'With Tori',
    caption: 'with my best friend Tori at The Goat House',
    location: 'Odessa, FL'
  },
  {
    id: 'tori2',
    cloudinaryId: 'tori2_nbdj8h',
    width: 480,
    height: 640,
    alt: 'With Tori',
    caption: 'silly faces with my best friend Tori',
    location: 'Odessa, FL'
  },
  {
    id: 'uncle',
    cloudinaryId: 'uncle_morda8',
    width: 720,
    height: 960,
    alt: 'Holding newborn',
    caption: 'becoming an uncle for the first time - meeting Micah',
    location: 'Clearwater, FL'
  },
  {
    id: 'vote',
    cloudinaryId: 'vote_hdqimk',
    width: 540,
    height: 960,
    alt: 'I Voted sticker',
    caption: 'berniewouldhavewon',
    location: 'Largo, FL'
  },
  {
    id: 'vote1',
    cloudinaryId: 'vote1_wsnidg',
    width: 895,
    height: 894,
    alt: 'I Voted sticker',
    caption: 'another election; another vote',
    location: 'Largo, FL'
  },
  {
    id: 'youth',
    cloudinaryId: 'youth_x7hjkw',
    width: 741,
    height: 564,
    alt: 'Childhood photo',
    caption:
      'with my sisters at the family computer in the 90s - the making of a software engineer',
    location: 'Rochester, NY'
  },
  {
    id: 'jens-wedding-party',
    cloudinaryId: 'jens-wedding-party_xj1oun',
    width: 2000,
    height: 1334,
    alt: "Jens's wedding",
    caption: "with the wedding party at Jens's wedding",
    location: 'Ontario, CA'
  },
  {
    id: 'marmot-watching',
    cloudinaryId: 'marmot-watching_udsqxa',
    width: 2000,
    height: 946,
    alt: 'Marmot at Mount Rainier',
    caption: 'photographing a marmot on the trail at Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-panorama',
    cloudinaryId: 'rainier-panorama_kfuhuc',
    width: 2000,
    height: 946,
    alt: 'Mount Rainier panorama',
    caption: 'panorama with glaciers from Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-hike',
    cloudinaryId: 'rainier-hike_li5jii',
    width: 2000,
    height: 1500,
    alt: 'Hiking at Paradise',
    caption: 'hiking at Paradise with friends',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-friends',
    cloudinaryId: 'rainier-friends_a6srrr',
    width: 2000,
    height: 1500,
    alt: 'Hiking at Paradise',
    caption: 'group selfie on the trail with the Tatoosh Range behind us',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'tatoosh-range',
    cloudinaryId: 'tatoosh-range_lhaexd',
    width: 2000,
    height: 946,
    alt: 'Tatoosh Range',
    caption: 'the Tatoosh Range views from Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-glaciers',
    cloudinaryId: 'rainier-glaciers_pz1vdh',
    width: 2000,
    height: 948,
    alt: 'Rainier glaciers',
    caption: 'on the trail approaching the glaciers',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-selfie',
    cloudinaryId: 'rainier-selfie_kq1jao',
    width: 2000,
    height: 948,
    alt: 'Rainier selfie',
    caption: 'caught slipping by Cody near the glaciers',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-trail',
    cloudinaryId: 'rainier-trail_hfxdpq',
    width: 2000,
    height: 946,
    alt: 'On the trail',
    caption: 'friends hiking the rocky trail at Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'cascade-vista',
    cloudinaryId: 'cascade-vista_gmr2v1',
    width: 2000,
    height: 946,
    alt: 'Cascade Range vista',
    caption: 'panoramic view of the Cascade Range from Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-ridge',
    cloudinaryId: 'rainier-ridge_d64qmg',
    width: 2000,
    height: 1500,
    alt: 'Rocky ridge selfie',
    caption: 'with Cody on the rocky ridge at Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-summit',
    cloudinaryId: 'rainier-summit_ecn5pf',
    width: 2000,
    height: 946,
    alt: 'Summit rest',
    caption: 'with Tini taking a break at the summit',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-group',
    cloudinaryId: 'rainier-group_imqmdt',
    width: 2000,
    height: 1500,
    alt: 'Group on the rocks',
    caption: 'group photo on the rocky trail at Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'paradise-valley',
    cloudinaryId: 'paradise-valley_wabbcj',
    width: 2000,
    height: 946,
    alt: 'Paradise valley',
    caption: 'looking down at Paradise valley and the Tatoosh Range',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'paradise-descent',
    cloudinaryId: 'paradise-descent_oisbub',
    width: 2000,
    height: 946,
    alt: 'Trail descent',
    caption: 'hiking down the trail through evergreens at Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-meadow',
    cloudinaryId: 'rainier-meadow_cwzc9x',
    width: 2000,
    height: 946,
    alt: 'Alpine meadow',
    caption: 'the mountain towering over the alpine meadow',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'paradise-meadow',
    cloudinaryId: 'paradise-meadow_hh1qrz',
    width: 2000,
    height: 946,
    alt: 'Meadow hike',
    caption: 'hiking through the alpine meadow at Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'jens-wedding-break',
    cloudinaryId: 'jens-wedding-break_wbuddz',
    width: 934,
    height: 1245,
    alt: 'Wedding setup break',
    caption:
      'taking a break from setting up the wedding - Jens, Rody, Cody, Tini, AJ, Themelis, Cliff',
    location: 'Ontario, CA'
  },
  {
    id: 'jens-wedding-toast',
    cloudinaryId: 'jens-wedding-toast_kc1rng',
    width: 2000,
    height: 1334,
    alt: 'Groomsmen toast',
    caption: "toasting at Jens's wedding",
    location: 'Ontario, CA'
  },
  {
    id: 'wedding-group-toast',
    cloudinaryId: 'wedding-group-toast_l5kl9g',
    width: 2000,
    height: 1334,
    alt: 'Wedding toast',
    caption: 'wedding guests raising glasses in celebration',
    location: 'Ontario, CA'
  },
  {
    id: 'wedding-reception-dinner',
    cloudinaryId: 'wedding-reception-dinner_afytut',
    width: 2000,
    height: 1334,
    alt: 'Reception dinner',
    caption: 'candlelit reception dinner for Jens and Britt',
    location: 'Ontario, CA'
  },
  {
    id: 'wedding-poolside-night',
    cloudinaryId: 'wedding-poolside-night_bp2hnq',
    width: 2000,
    height: 1334,
    alt: 'Poolside reception',
    caption: 'poolside wedding reception at night for Jens and Britt',
    location: 'Ontario, CA'
  },
  {
    id: 'jens-groomsmen',
    cloudinaryId: 'jens-groomsmen_hyxjqc',
    width: 2000,
    height: 1334,
    alt: 'The groomsmen',
    caption: 'Jens with his groomsmen',
    location: 'Ontario, CA'
  },
  {
    id: 'wedding-boys-table',
    cloudinaryId: 'wedding-boys-table_twyulr',
    width: 2000,
    height: 1506,
    alt: 'Wedding boys table',
    caption: 'the boys - Cliff, Cody, Jens, and Themelis',
    location: 'Ontario, CA'
  },
  {
    id: 'wedding-groom-prep',
    cloudinaryId: 'wedding-groom-prep_f5yrlc',
    width: 1500,
    height: 2000,
    alt: 'Groom prep',
    caption: 'helping Jens get dressed for the big day',
    location: 'Ontario, CA'
  },
  {
    id: 'wedding-getting-dressed',
    cloudinaryId: 'wedding-getting-dressed_i8s9wz',
    width: 1500,
    height: 2000,
    alt: 'Getting dressed',
    caption: 'getting Jens ready for his wedding day',
    location: 'Ontario, CA'
  },
  {
    id: 'rainier-tatoosh-trail',
    cloudinaryId: 'rainier-tatoosh-trail_xmxyhk',
    width: 1500,
    height: 2000,
    alt: 'Tatoosh trail view',
    caption: 'trail view with the Tatoosh Range',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-trail-duo',
    cloudinaryId: 'rainier-trail-duo_j9ixld',
    width: 1500,
    height: 2000,
    alt: 'Trail duo',
    caption: 'with Tini and Ashlee on the trail',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-snow-break',
    cloudinaryId: 'rainier-snow-break_ovosoa',
    width: 1500,
    height: 2000,
    alt: 'Snow break',
    caption: 'Themelis taking a break in the snow at Paradise',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-couple-selfie',
    cloudinaryId: 'rainier-couple-selfie_tteou5',
    width: 1500,
    height: 2000,
    alt: 'Couple selfie',
    caption: 'with Tini on the trail',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-summit-couple',
    cloudinaryId: 'rainier-summit-couple_ap1nih',
    width: 1500,
    height: 2000,
    alt: 'Summit selfie',
    caption: 'with Tini at the summit',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-stream',
    cloudinaryId: 'rainier-stream_ojzhan',
    width: 1500,
    height: 2000,
    alt: 'Mountain stream',
    caption: 'mountain stream with the peak in the background',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-group-trail',
    cloudinaryId: 'rainier-group-trail_qgh4mf',
    width: 2000,
    height: 1500,
    alt: 'Trail group selfie',
    caption: 'on the trail',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-group-mountain',
    cloudinaryId: 'rainier-group-mountain_y0szpb',
    width: 2000,
    height: 1500,
    alt: 'Group at Paradise',
    caption: 'group photo with the mountain behind us',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-summit-pano',
    cloudinaryId: 'rainier-summit-pano_qm9kj9',
    width: 2000,
    height: 613,
    alt: 'Summit panorama',
    caption: 'panoramic view from the summit',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'rainier-glacier-approach',
    cloudinaryId: 'rainier-glacier-approach_thskxh',
    width: 2000,
    height: 1500,
    alt: 'Glacier approach',
    caption: 'Tini teaching me to love nature',
    location: 'Mount Rainier, WA'
  },
  {
    id: 'patio-drinks',
    cloudinaryId: 'patio-drinks_aznxzk',
    width: 1500,
    height: 2000,
    alt: 'Patio drinks',
    caption: 'outdoor patio drinks with Themelis and Ashlee',
    location: 'Seattle, WA'
  },
  {
    id: 'road-trip-car',
    cloudinaryId: 'road-trip-car_wo61sb',
    width: 2000,
    height: 1500,
    alt: 'Road trip selfie',
    caption: 'road trip to Mount Rainier - Tini, Themelis, Ashlee, AJ, and Cody',
    location: 'Washington'
  },
  {
    id: 'escape-room-fun',
    cloudinaryId: 'escape-room-fun_gqngwc',
    width: 2000,
    height: 1500,
    alt: 'Escape room',
    caption: 'silly signs after completing an escape room',
    location: 'Seattle, WA'
  },
  {
    id: 'korean-bbq-spread',
    cloudinaryId: 'korean-bbq-spread_exwifw',
    width: 1500,
    height: 2000,
    alt: 'Korean BBQ',
    caption: 'Korean BBQ table spread',
    location: 'Seattle, WA'
  },
  {
    id: 'seattle-rooftop-sunset',
    cloudinaryId: 'seattle-rooftop-sunset_mikowt',
    width: 2000,
    height: 1500,
    alt: 'Rooftop sunset',
    caption: 'rooftop deck gathering at sunset',
    location: 'Seattle, WA'
  },
  {
    id: 'deck-gathering',
    cloudinaryId: 'deck-gathering_sxrxyq',
    width: 2000,
    height: 1500,
    alt: 'Deck hangout',
    caption: 'gathering on the roof with River',
    location: 'Seattle, WA'
  },
  {
    id: 'korean-bbq-dinner',
    cloudinaryId: 'korean-bbq-dinner_jv0ixu',
    width: 2000,
    height: 1500,
    alt: 'Korean BBQ dinner',
    caption: 'enjoying Korean BBQ after a day hiking Mount Rainier',
    location: 'Seattle, WA'
  },
  {
    id: 'brunch-spread',
    cloudinaryId: 'brunch-spread_katfcm',
    width: 2000,
    height: 1500,
    alt: 'Brunch',
    caption: 'brunch spread at an outdoor patio',
    location: 'Seattle, WA'
  },
  {
    id: 'living-room-hangout',
    cloudinaryId: 'living-room-hangout_supk2j',
    width: 2000,
    height: 1414,
    alt: 'Living room hangout',
    caption: 'trading new music and relaxing - Jens, River, AJ, and Themelis',
    location: 'Seattle, WA'
  },
  {
    id: 'rooftop-dinner',
    cloudinaryId: 'rooftop-dinner_a8bxmg',
    width: 2000,
    height: 1506,
    alt: 'Rooftop dinner',
    caption: 'having dinner on the rooftop at sunset - Cody, Themelis, Tini, AJ, and Ashlee',
    location: 'Seattle, WA'
  },
  {
    id: 'sunset-photographer',
    cloudinaryId: 'sunset-photographer_eoh5pu',
    width: 1506,
    height: 2000,
    alt: 'Sunset photographer',
    caption: 'capturing Ashlee capturing the sunset from the rooftop',
    location: 'Seattle, WA'
  },
  {
    id: 'seattle-sculpture',
    cloudinaryId: 'seattle-sculpture_mxqwiv',
    width: 1500,
    height: 2000,
    alt: 'Seattle art',
    caption: 'geometric art installation in the city - Ashlee, AJ, Tini, Cody, and Jens',
    location: 'Seattle, WA'
  },
  {
    id: 'pfp-2024',
    cloudinaryId: 'pfp-2024_ergu7t',
    width: 1333,
    height: 2000,
    alt: 'Profile photo 2024',
    caption: 'headshot provided by RIT 2024',
    location: 'Rochester, NY'
  },
  {
    id: 'pfp-2025',
    cloudinaryId: 'pfp-2025_qdtqen',
    width: 1334,
    height: 2000,
    alt: 'Profile photo 2025',
    caption: 'headshot provided by RIT 2025',
    location: 'Rochester, NY'
  }
]
