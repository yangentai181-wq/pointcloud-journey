const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

const checks = [
  ["random thinning panel", /単純な間引き/.test(html)],
  ["guided method panel", /提案手法/.test(html)],
  ["random canvas", /id="randomCanvas"/.test(html)],
  ["guided canvas", /id="guidedCanvas"/.test(html)],
  ["random ESR metric", /id="randomEsr"/.test(html)],
  ["guided ESR metric", /id="guidedEsr"/.test(html)],
  ["shared reduction copy", /削減率\s*70%/.test(html)],
  ["guided ESR target copy", /ESR\s*60%/.test(html)],
  ["guided surface retention copy", /青い面点も残す/.test(html)],
  ["guided member retention target", /const GUIDED_MEMBER_KEEP\s*=\s*0\.6/.test(html)],
  ["shared initial member alpha", /const INITIAL_MEMBER_ALPHA\s*=\s*0\.74/.test(html)],
  ["shared initial surface alpha", /const INITIAL_SURFACE_ALPHA\s*=\s*0\.62/.test(html)],
  ["guided effect delayed from start", /const methodReveal\s*=\s*Math\.max\(0,\s*Math\.min\(1,\s*\(t\s*-\s*0\.08\)\s*\/\s*0\.92\)\)/.test(html)],
  ["importance scoring function", /function scoreImportance/.test(html)],
  ["comparison summary", /同じ軽量化率でも、何を残すかで結果が違う/.test(html)],
];

const failed = checks.filter(([, ok]) => !ok);

if (failed.length > 0) {
  console.error("Reduction comparison animation checks failed:");
  for (const [name] of failed) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log("Reduction comparison animation checks passed.");
