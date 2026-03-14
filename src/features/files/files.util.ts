import { BunFile } from "bun";
import { Readable } from "stream";

export function fileToReadableStream(file: File | BunFile) {
  const stream = Readable.fromWeb(file.stream() as any, {
    highWaterMark: 256 * 1024
  });
  return stream;
}
