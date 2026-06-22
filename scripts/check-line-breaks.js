const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

const japaneseTextBlockMatch = html.match(
  /\/\*\s*Japanese text wrapping[\s\S]*?footer \.wrap\s*\{[\s\S]*?\}/,
);
const japaneseTextBlock = japaneseTextBlockMatch?.[0] ?? "";
const trendBodyMatch = html.match(/\.trend-body\s*\{[\s\S]*?\}/);
const trendBodyBlock = trendBodyMatch?.[0] ?? "";

const checks = [
  ["no auto phrase wrapping", !/word-break:\s*auto-phrase/.test(html)],
  ["no strict Japanese line breaking", !/line-break:\s*strict/.test(html)],
  ["no global pretty wrapping", !/text-wrap:\s*pretty/.test(html)],
  ["Japanese text uses normal word breaking", /word-break:\s*normal/.test(japaneseTextBlock)],
  ["Japanese text uses safe overflow wrapping", /overflow-wrap:\s*break-word/.test(japaneseTextBlock)],
  ["Japanese text uses default line breaking", /line-break:\s*auto/.test(japaneseTextBlock)],
  ["body text uses ordinary wrapping", /text-wrap:\s*wrap/.test(japaneseTextBlock)],
  ["trend body avoids arbitrary word splitting", !/word-break:\s*break-word/.test(trendBodyBlock)],
  ["hero headline may still balance", /\.hero h1\s*\{[\s\S]*?text-wrap:\s*balance/.test(html)],
  ["critical surface point term is protected", /<span class="nowrap">青い面点も残す<\/span>/.test(html)],
  ["nowrap utility is available", /\.nowrap\s*\{[\s\S]*?white-space:\s*nowrap/.test(html)],
];

const failed = checks.filter(([, ok]) => !ok);

if (failed.length > 0) {
  console.error("Line break checks failed:");
  for (const [name] of failed) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log("Line break checks passed.");
