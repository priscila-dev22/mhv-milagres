import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const mediaDir = path.join(projectRoot, "public", "media");

const targets = [
  { in: "no-quintal.png", out: "no-quintal.png" },
  { in: "nacasa-de-boa.png", out: "nacasa-de-boa.png" },
  { in: "sur.png", out: "sur.png" },
  { in: "o-beco.png", out: "o-beco.png" },
  { in: "milagres-do-toque.png", out: "milagres-do-toque.png" },
  { in: "milagresbeach-source.jpg", out: "milagresbeach.png" },
  { in: "jetski-bg-source.jpg", out: "jetski-bg.jpg" },
  { in: "igrejinha-marceneiro.png", out: "igrejinha-marceneiro.png" },
  { in: "peixe-boi.png", out: "peixe-boi.png" },
];

async function enhanceOne(filenameIn, filenameOut) {
  const inputPath = path.join(mediaDir, filenameIn);
  const outputPath = path.join(mediaDir, filenameOut);

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Missing input image: ${inputPath}`);
  }

  const image = sharp(inputPath, { failOn: "none" });
  const meta = await image.metadata();

  // Upscale to a consistent, crisp baseline without changing aspect ratio.
  // This does not "invent" detail, but it helps reduce compression artifacts
  // and gives the browser a higher-res source for the same card crop (4:3).
  const defaultTargetWidth = 2200;
  const milagresBeachTargetWidth = 2560;
  const jetskiBgTargetWidth = 2560;

  const width = typeof meta.width === "number" ? meta.width : null;

  let targetWidth = defaultTargetWidth;
  if (filenameOut === "milagresbeach.png") {
    targetWidth = milagresBeachTargetWidth;
  } else if (filenameOut === "jetski-bg.jpg") {
    targetWidth = jetskiBgTargetWidth;
  }

  let shouldResize = false;
  if (width !== null) {
    if (filenameOut === "milagresbeach.png") {
      // Normalize very large drone shots to a crisp web-friendly max width,
      // while still staying well above Full HD for retina displays.
      shouldResize = width !== targetWidth;
    } else if (filenameOut === "jetski-bg.jpg") {
      shouldResize = width !== targetWidth;
    } else {
      shouldResize = width < targetWidth;
    }
  }

  let pipeline = image;

  if (shouldResize) {
    pipeline = pipeline.resize({
      width: targetWidth,
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    });
  }

  // Default: gentle cleanup + clarity (conservative to avoid halos).
  // MilagresBeach: prioritize realism (avoid heavy median smoothing).
  if (filenameOut === "milagresbeach.png") {
    pipeline = pipeline
      .median(2)
      .sharpen({ sigma: 0.85, m1: 0.55, m2: 0.75, x1: 2.0, y2: 10 })
      .linear(1.035, -4) // slightly stronger micro-contrast for aerial water
      .modulate({ saturation: 1.045, brightness: 1.012 })
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false, effort: 10 });
  } else if (filenameOut === "jetski-bg.jpg") {
    pipeline = pipeline
      .median(2)
      .sharpen({ sigma: 0.9, m1: 0.6, m2: 0.8, x1: 2.2, y2: 11 })
      .linear(1.03, -3)
      .modulate({ saturation: 1.04, brightness: 1.01 })
      .jpeg({ quality: 88, chromaSubsampling: "4:4:4", mozjpeg: true });
  } else {
    pipeline = pipeline
      .median(3)
      .sharpen({ sigma: 1.1, m1: 0.7, m2: 0.9, x1: 2.5, y2: 12 })
      .linear(1.02, -2) // micro-contrast
      .modulate({ saturation: 1.03, brightness: 1.01 })
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false });
  }

  await pipeline.toFile(outputPath + ".tmp");
  fs.renameSync(outputPath + ".tmp", outputPath);

  return { inputPath, outputPath, meta, resizedTo: shouldResize ? targetWidth : null };
}

const results = [];
for (const t of targets) {
  // eslint-disable-next-line no-await-in-loop
  results.push(await enhanceOne(t.in, t.out));
}

for (const r of results) {
  const before = r.meta.width && r.meta.height ? `${r.meta.width}x${r.meta.height}` : "unknown";
  // eslint-disable-next-line no-console
  console.log(
    `Enhanced ${path.basename(r.outputPath)} (was ${before})` +
      (r.resizedTo ? ` → width ${r.resizedTo}` : "")
  );
}

