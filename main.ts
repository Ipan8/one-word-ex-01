// One Word From Your Ex — make.fun entry.
//
// The prompt asks for the single word an ex would use to describe you.
// The honest answer is not a story and not an excuse. It is a verdict:
// one word that makes the room laugh first and wince second. That word
// is "Regret". The laugh lands because everyone recognises it instantly;
// the sting lands because it is probably true. Other candidates describe
// what happened — ghosted, left, avoided — but this one describes what
// you were. A verdict, not an event. No second word can improve it, and
// no explanation can soften it, so the entry stays exactly one word.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUTPUT_FILE = "/output/entry.txt";

// Shortlist of words an ex might reach for. Only one survives the cut:
// the one that is funny and painful at the same time.
const SHORTLIST = ["Regret", "Ghosted", "Avoid", "Mistake", "Never"] as const;

type Candidate = (typeof SHORTLIST)[number];

function scoreWord(word: Candidate): number {
  // "Regret" scores highest: it is the verdict on the whole relationship,
  // not a report of one bad weekend. The others narrate an event; this
  // one passes judgement, which is exactly what the prompt asks for.
  if (word === "Regret") return 10;
  if (word === "Mistake") return 6;
  return 3;
}

function chooseWord(candidates: readonly Candidate[]): Candidate {
  let best = candidates[0];
  for (const word of candidates) {
    if (scoreWord(word) > scoreWord(best)) best = word;
  }
  return best;
}

function isSingleWord(value: string): boolean {
  // One word means letters only: no spaces, no hyphens, no punctuation,
  // nothing smuggled in after a comma. If it needs a second word, it is
  // the wrong word.
  return /^[A-Za-z]+$/.test(value.trim());
}

function guardSingleWord(word: string): string {
  const cleaned = word.trim();
  if (!isSingleWord(cleaned)) {
    throw new Error(`Entry must be exactly one word, got: ${word}`);
  }
  return cleaned;
}

function whyItLands(word: string): string {
  // The joke works in two beats: first the laugh ("of course"), then the
  // sting ("...yeah, fair"). A word that only stings is bitter, a word
  // that only amuses is forgettable. This one does both in six letters.
  return `${word} — the laugh and the sting in a single hit.`;
}

function saveEntry(word: string): void {
  const finalWord = guardSingleWord(word);
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(join(OUTPUT_FILE), `${finalWord}\n`, "utf-8");
  console.log(whyItLands(finalWord));
  console.log(`Wrote one-word entry to ${OUTPUT_FILE}: ${finalWord}`);
}

function main(): void {
  // Pick, guard, then write. Keeping the steps separate means the entry
  // can never drift into two words by accident: the guard runs on the
  // exact string that gets written, not on a draft of it.
  const picked = chooseWord(SHORTLIST);
  saveEntry(picked);
}

main();
