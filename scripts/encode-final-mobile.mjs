/**
 * Gera final.mobile.mp4 a partir de uma fonte (padrão: public/media/videos/n d.mp4).
 * Perfil alinhado ao hero.mobile: 1280×720, H.264, sem áudio, faststart.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegStatic from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const videosDir = path.join(root, "public", "media", "videos");

const source = process.argv[2] ?? path.join(videosDir, "n d.mp4");
const output = path.join(videosDir, "final.mobile.mp4");
const tempOut = path.join(videosDir, "final.mobile.encode.mp4");

if (!ffmpegStatic) {
  console.error("ffmpeg-static não encontrado.");
  process.exit(1);
}

if (!fs.existsSync(source)) {
  console.error("Arquivo de origem não encontrado:", source);
  process.exit(1);
}

const args = [
  "-y",
  "-i",
  source,
  "-vf",
  "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=black",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "26",
  "-maxrate",
  "2200k",
  "-bufsize",
  "4400k",
  "-profile:v",
  "main",
  "-pix_fmt",
  "yuv420p",
  "-an",
  "-movflags",
  "+faststart",
  tempOut,
];

console.log("Codificando mobile a partir de:", source);
const result = spawnSync(ffmpegStatic, args, { stdio: "inherit" });

if (result.status !== 0) {
  console.error("Falha na codificação ffmpeg.");
  if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
  process.exit(result.status ?? 1);
}

fs.renameSync(tempOut, output);
const mb = (fs.statSync(output).size / (1024 * 1024)).toFixed(2);
console.log("Gerado:", output, `(${mb} MB)`);
