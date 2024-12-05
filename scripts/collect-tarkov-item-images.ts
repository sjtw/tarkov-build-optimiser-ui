import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { getAllImages } from "@/app/lib/tarkov-api";

async function downloadImage(url: string, id: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();

  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "tarkov",
    `${id}${path.extname(url)}`,
  );
  fs.writeFileSync(filePath, Buffer.from(buffer));

  console.log(`Image saved as ${filePath}`);
}

async function run() {
  const imageData = await getAllImages();

  for (const d of imageData) {
    await downloadImage(d.baseImageLink, d.id);
  }
}

run()
  .then(() => console.log("All item images saved to public/images/tarkov"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
