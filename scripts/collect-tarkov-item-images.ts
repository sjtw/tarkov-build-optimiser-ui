import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { getAllImages, ItemImageRef, TraderImageRef } from "@/app/lib/tarkov-api";

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
  // Ensure directory exists before writing file
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, Buffer.from(buffer));

  console.log(`Image saved as ${filePath}`);
}

async function downloadItemImages(items: ItemImageRef[]) {
  for (const item of items) {
    try {
      await downloadImage(item.baseImageLink, item.id);
    } catch (err) {
      console.error(err);
      console.warn(`Failed to download item ${item.id} ${item.baseImageLink}`);
    }
  }
}

async function downloadTraderImages(traders: TraderImageRef[]) {
  for (const trader of traders) {
    try {
      await downloadImage(trader.imageLink, trader.name);
    } catch (err) {
      console.error(err);
      console.warn(`Failed to download trader ${trader.name} ${trader.imageLink}`);
    }
  }
}

async function run() {
  const imageData = await getAllImages();

  try {
    await Promise.all([
      downloadItemImages(imageData.items),
      downloadTraderImages(imageData.traders)
    ]);
  } catch (err) {
    console.error(err);
  }
}

run()
  .then(() => console.log("All item images saved to public/images/tarkov"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
