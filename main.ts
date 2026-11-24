// One Word From Your Ex — make.fun entry
// The entry: exactly one word, the word your ex would use to describe you.
// Picked word: "Regret" — the funniest, most painfully honest answer.
// It lands both ways at once: the laugh (of course that's the word) and the
// sting (because it's probably true). One word, no explanation needed.
// Why not "Ghosted" or "Avoid"? Those describe what happened, not what you
// are. "Regret" is the verdict — the word an ex reaches for when asked to
// sum you up in one hit.

import * as fs from "node:fs";

const ENTRY = "Regret";

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", ENTRY + "\n", "utf-8");

console.log("Entry written:", ENTRY);
