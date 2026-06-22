import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const pagePath = path.join(__dirname, "../src/data/page.json");
  const sampleData = JSON.parse(fs.readFileSync(pagePath, "utf-8"));
  fs.writeFileSync(pagePath, `${JSON.stringify(sampleData, null, 2)}\n`);
  console.log(`Formatted ${pagePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
