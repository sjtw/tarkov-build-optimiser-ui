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
  // Ensure directory exists before writing file
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, Buffer.from(buffer));

  console.log(`Image saved as ${filePath}`);
}

async function downloadImageRefs(imageRefs: ImageRef[], idParam: 'id' | 'name', linkParam: 'imageLink' | 'baseImageLink') {
  for (const d of imageRefs) {
    const id = d[idParam];
    const link = d[linkParam];
    try {
      await downloadImage(link, id);
    } catch (err) {
      console.error(err);
      console.warn(`Failed to download ${id} ${link}`);
    }
  }
}

async function run() {
  const imageData = await getAllImages();

  try {
    await Promise.all([
      await downloadImageRefs(imageData.items, 'id', 'baseImageLink'),
      await downloadImageRefs(imageData.traders, 'name', 'imageLink')
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
