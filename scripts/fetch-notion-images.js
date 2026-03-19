import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Client } from "@notionhq/client";
import { writeFileSync, readFileSync, mkdirSync, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.error(
    "Missing NOTION_API_KEY or NOTION_DATABASE_ID in environment.\n" +
      "Add them to .env.local and re-run."
  );
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

const PUBLIC_DIR = path.resolve("public/projects");
const MANIFEST_PATH = path.resolve("src/data/project-images.json");

// Notion rate limit: 3 req/s — wait 350ms between requests to stay safe
const RATE_LIMIT_MS = 350;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Derive a URL-safe slug from a project title. */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Extract a file extension from a URL, falling back to the given default. */
function extFromUrl(url, fallback = ".png") {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).split("?")[0].toLowerCase();
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif", ".mp4", ".mov", ".webm"];
    if (allowed.includes(ext)) return ext;
  } catch {
    // ignore parse errors
  }
  return fallback;
}

/** Get the URL from a video block. */
function getVideoUrl(videoObj) {
  if (!videoObj) return null;
  if (videoObj.type === "file") return { url: videoObj.file?.url ?? null, type: "file" };
  if (videoObj.type === "external") return { url: videoObj.external?.url ?? null, type: "external" };
  return null;
}

/** Extract caption text from a block's caption array. */
function getBlockCaption(captionArr) {
  if (!captionArr || captionArr.length === 0) return "";
  return captionArr.map((t) => t.plain_text).join("");
}

/** Get the image URL from an image block or cover object. */
function getImageUrl(imageObj) {
  if (!imageObj) return null;
  if (imageObj.type === "file") return imageObj.file?.url ?? null;
  if (imageObj.type === "external") return imageObj.external?.url ?? null;
  return null;
}

/** Extract the title string from a Notion page's Title property. */
function getPageTitle(page) {
  const props = page.properties;
  for (const prop of Object.values(props)) {
    if (prop.type === "title" && prop.title?.length > 0) {
      return prop.title.map((t) => t.plain_text).join("");
    }
  }
  return null;
}

/** Download a file from `url` to `destPath`. Returns true on success. */
async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const stream = Readable.fromWeb(res.body);
  await pipeline(stream, createWriteStream(destPath));
  return true;
}

// ---------------------------------------------------------------------------
// Recursive block fetching
// ---------------------------------------------------------------------------

async function fetchAllChildBlocks(blockId) {
  const blocks = [];
  let cursor;

  do {
    await sleep(RATE_LIMIT_MS);
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  // Recurse into children
  for (const block of blocks) {
    if (block.has_children) {
      const children = await fetchAllChildBlocks(block.id);
      blocks.push(...children);
    }
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Fetching portfolio database...\n");

  // 1. Query all pages from the database
  //    @notionhq/client v5 moved databases.query → dataSources.query
  const pages = [];
  let cursor;

  do {
    await sleep(RATE_LIMIT_MS);
    const res = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_cursor: cursor,
          page_size: 100,
        }),
      }
    ).then((r) => {
      if (!r.ok) throw new Error(`Notion API ${r.status}: ${r.statusText}`);
      return r.json();
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  console.log(`Found ${pages.length} pages in database.\n`);

  const manifest = {};
  let totalImages = 0;
  let failures = 0;

  // 2. Process each page
  for (const page of pages) {
    const title = getPageTitle(page);
    if (!title) {
      console.log(`  Skipping page ${page.id} — no title found.`);
      continue;
    }

    const slug = slugify(title);
    const dir = path.join(PUBLIC_DIR, slug);
    mkdirSync(dir, { recursive: true });

    console.log(`Processing: ${title} (${slug})`);

    const entry = { cover: null, images: [], videos: [], embeds: [], links: [] };

    // 2a. Cover image
    const coverUrl = getImageUrl(page.cover);
    if (coverUrl) {
      const ext = extFromUrl(coverUrl);
      const coverFile = `cover${ext}`;
      const destPath = path.join(dir, coverFile);
      try {
        await downloadImage(coverUrl, destPath);
        entry.cover = `/projects/${slug}/${coverFile}`;
        console.log(`  Cover downloaded.`);
      } catch (err) {
        console.error(`  Failed to download cover: ${err.message}`);
        failures++;
      }
    }

    // 2b. Fetch all blocks and collect images
    const blocks = await fetchAllChildBlocks(page.id);
    const imageBlocks = blocks.filter((b) => b.type === "image");

    let idx = 1;
    for (const block of imageBlocks) {
      const url = getImageUrl(block.image);
      if (!url) continue;

      const ext = extFromUrl(url);
      const filename = `${String(idx).padStart(3, "0")}${ext}`;
      const destPath = path.join(dir, filename);

      try {
        await downloadImage(url, destPath);
        entry.images.push(`/projects/${slug}/${filename}`);
        idx++;
        totalImages++;
        process.stdout.write(`  Image ${idx - 1}/${imageBlocks.length}\r`);
      } catch (err) {
        console.error(`  Failed to download image: ${err.message}`);
        failures++;
      }
    }

    if (imageBlocks.length > 0) console.log();

    // 2c. Collect video blocks
    const videoBlocks = blocks.filter((b) => b.type === "video");
    let vidIdx = 1;
    for (const block of videoBlocks) {
      const info = getVideoUrl(block.video);
      if (!info || !info.url) continue;
      const caption = getBlockCaption(block.video?.caption);

      if (info.type === "external") {
        entry.videos.push({ url: info.url, type: "external", caption });
      } else {
        // Notion-hosted video — download since URLs expire
        const ext = extFromUrl(info.url, ".mp4");
        const filename = `video-${String(vidIdx).padStart(3, "0")}${ext}`;
        const destPath = path.join(dir, filename);
        try {
          await downloadImage(info.url, destPath);
          entry.videos.push({ url: `/projects/${slug}/${filename}`, type: "file", caption });
          vidIdx++;
        } catch (err) {
          console.error(`  Failed to download video: ${err.message}`);
          failures++;
        }
      }
    }

    // 2d. Collect embed blocks
    const embedBlocks = blocks.filter((b) => b.type === "embed");
    for (const block of embedBlocks) {
      const url = block.embed?.url;
      if (!url) continue;
      const caption = getBlockCaption(block.embed?.caption);
      entry.embeds.push({ url, caption });
    }

    // 2e. Collect bookmark and link_preview blocks
    const linkBlocks = blocks.filter((b) => b.type === "bookmark" || b.type === "link_preview");
    for (const block of linkBlocks) {
      const data = block[block.type];
      const url = data?.url;
      if (!url) continue;
      const title = getBlockCaption(data?.caption) || "";
      entry.links.push({ url, title });
    }

    manifest[slug] = entry;
  }

  // 3. Preserve manually curated sections from existing manifest
  try {
    const existing = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
    for (const [slug, entry] of Object.entries(existing)) {
      if (entry.sections && manifest[slug]) {
        manifest[slug].sections = entry.sections;
      }
    }
  } catch {
    // No existing manifest — nothing to preserve
  }

  // 4. Write manifest
  mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  // 5. Summary
  console.log("\n--- Summary ---");
  console.log(`Projects processed: ${Object.keys(manifest).length}`);
  console.log(`Images downloaded:  ${totalImages}`);
  if (failures > 0) {
    console.log(`Failures:           ${failures}`);
  }
  console.log(`Manifest written:   ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
