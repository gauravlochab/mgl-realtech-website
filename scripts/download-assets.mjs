import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';

const BASE_CDN = 'https://cdn.prod.website-files.com/69372e47ab695bf5546b46ec';

const assets = [
  // Logo
  { url: `${BASE_CDN}/69388fa01bc6655a709f40a4_Logo.svg`, path: 'public/images/logo.svg' },

  // Hero video
  { url: `${BASE_CDN}%2F69610a0c261bf5a0d9012dd6_hero%203%20%281%29_mp4.mp4`, path: 'public/videos/hero.mp4' },
  { url: `${BASE_CDN}%2F69610a0c261bf5a0d9012dd6_hero%203%20%281%29_webm.webm`, path: 'public/videos/hero.webm' },

  // About
  { url: `${BASE_CDN}/693881a350b370d1b613ff09_about-img--d.avif`, path: 'public/images/about-desktop.avif' },

  // Livings/Projects
  { url: `${BASE_CDN}/693881b0a57115d8cd3a12c2_livings-img-1--d.avif`, path: 'public/images/livings-1.avif' },
  { url: `${BASE_CDN}/693881b0422731c7d2c5fcac_livings-img-2--d.avif`, path: 'public/images/livings-2.avif' },
  { url: `${BASE_CDN}/693881b00e2082f46e0752ce_livings-img-3--d.avif`, path: 'public/images/livings-3.avif' },

  // Beliefs
  { url: `${BASE_CDN}/693881c0bd19ffb64b94f142_beliefs-img--d.avif`, path: 'public/images/beliefs-1-desktop.avif' },
  { url: `${BASE_CDN}/693881bfdfb07f671238f951_beliefs-img--mob.avif`, path: 'public/images/beliefs-1-mobile.avif' },
  { url: `${BASE_CDN}/693881c0f19790d102a7679d_beliefs-img-2--d.avif`, path: 'public/images/beliefs-2-desktop.avif' },
  { url: `${BASE_CDN}/693881bf041520f6c9ca8770_beliefs-img-2--mob.avif`, path: 'public/images/beliefs-2-mobile.avif' },

  // Amenities
  { url: `${BASE_CDN}/693881e61a7e42ff6909d76b_amenities-img-1--big.avif`, path: 'public/images/amenities-1-big.avif' },
  { url: `${BASE_CDN}/693881e6a674c6a8d122c34d_amenities-img-1--small.avif`, path: 'public/images/amenities-1-small.avif' },
  { url: `${BASE_CDN}/693881ec1f8b80b2102e2e7b_amenities-img-2--big.avif`, path: 'public/images/amenities-2-big.avif' },
  { url: `${BASE_CDN}/693881eb51e7ae892329f6f6_amenities-img-2--small.avif`, path: 'public/images/amenities-2-small.avif' },
  { url: `${BASE_CDN}/693881f24c53d654d7f00751_amenities-img-3--big.avif`, path: 'public/images/amenities-3-big.avif' },
  { url: `${BASE_CDN}/693881f1049ac7d72bb5f66f_amenities-img-3--small.avif`, path: 'public/images/amenities-3-small.avif' },

  // CTA
  { url: `${BASE_CDN}/693881d5049ac7d72bb5f18f_cta-img--d.avif`, path: 'public/images/cta-desktop.avif' },
  { url: `${BASE_CDN}/693881c82316816e1085777d_cta-img--mob.avif`, path: 'public/images/cta-mobile.avif' },
];

async function download(url, path) {
  const dir = dirname(path);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });

  try {
    const decodedUrl = decodeURIComponent(url);
    const res = await fetch(decodedUrl);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(path, buf);
    console.log(`  ✓ ${path} (${(buf.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ✗ ${path}: ${err.message}`);
  }
}

console.log(`Downloading ${assets.length} assets...\n`);

// Download 4 at a time
for (let i = 0; i < assets.length; i += 4) {
  const batch = assets.slice(i, i + 4);
  await Promise.all(batch.map(a => download(a.url, a.path)));
}

console.log('\nDone!');
