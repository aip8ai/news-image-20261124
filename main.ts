// News-image entry: the finished front page is entry.png beside this file,
// and the program writes those exact bytes to the output directory as
// entry.png. It runs twice and both runs write identical bytes, because it
// only copies the file and never renders anything.
// Run it with: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(join(here, "entry.png"));
const target = join(outDir, "entry.png");
writeFileSync(target, bytes);
if (readFileSync(target).length !== bytes.length) {
  throw new Error("entry.png was not copied whole");
}
