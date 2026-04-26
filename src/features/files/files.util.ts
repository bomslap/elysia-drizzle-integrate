import { BunFile } from "bun";
import { Readable } from "stream";
import sharp from "sharp";

export function fileToReadableStream(file: File | BunFile) {
  const stream = Readable.fromWeb(file.stream() as any, {
    highWaterMark: 256 * 1024,
  });
  return stream;
}

export const imageToWebPTransformer = sharp()
  // .resize({ width: 800, withoutEnlargement: true })
  .webp({
    quality: 80,
    effort: 4,
  });
