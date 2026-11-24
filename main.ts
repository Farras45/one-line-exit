// The One-Line Exit — a one-line resignation letter from a town crier.
//
// The joke: after twelve years of shouting everyone else's news, the crier
// finally has news of his own — and it is his resignation. Specific voice,
// one line, punchline at the very end, nothing padded around it.
//
// Writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: no clock reads, no randomness, no network, no secrets.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I hereby resign as town crier: after twelve years of shouting everyone else's news, I finally have some of my own — I quit.";

// Count characters the way the gate does: Unicode code points, so the
// em dash counts as one character.
const charCount = [...ENTRY].length;

if (charCount < 1 || charCount > 140) {
  throw new Error(`Entry must be 1-140 characters, got ${charCount}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote entry.txt (${charCount} characters)`);
