// Decodes base64 text assets (fonts, social preview image) into dist/ after the vite build.
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const fontsTxt = path.resolve("public/matcha/fonts.b64.txt");
if (fs.existsSync(fontsTxt)) {
  fs.mkdirSync(path.join(dist, "fonts"), { recursive: true });
  for (const line of fs.readFileSync(fontsTxt, "utf8").split("\n")) {
    const [name, b64] = line.trim().split(" ");
    if (name && b64) fs.writeFileSync(path.join(dist, "fonts", name), Buffer.from(b64, "base64"));
  }
}
const ogTxt = path.resolve("public/matcha/og-image.b64.txt");
if (fs.existsSync(ogTxt)) {
  fs.writeFileSync(path.join(dist, "og-image.png"), Buffer.from(fs.readFileSync(ogTxt, "utf8").trim(), "base64"));
}

const heroTxt = path.resolve("public/matcha/hero-latte.b64.txt");
if (fs.existsSync(heroTxt)) {
  fs.writeFileSync(path.join(dist, "hero-latte.webp"), Buffer.from(fs.readFileSync(heroTxt, "utf8").trim(), "base64"));
}
