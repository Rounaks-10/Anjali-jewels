import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const assetDir = path.join(rootDir, "public", "assets", "alljew");
const outputDir = path.join(rootDir, "public", "generated");
const outputFile = path.join(outputDir, "jewellery-items.json");

const curatedItems = new Map([
  [
    "1",
    {
      name: "Bloom Bud Gold Ring",
      price: "82321",
      product: "Finger Ring",
      gender: "women",
    },
  ],
  [
    "2",
    {
      name: "Verdant Bloom Gold Ring",
      price: "68752",
      product: "Finger Ring",
      gender: "women",
      stock: "Only 1 left!",
    },
  ],
  [
    "3",
    {
      name: "Tropical Canopy Gold Drop Earrings",
      price: "134562",
      product: "Earrings",
      gender: "women",
      stock: "Only 1 left!",
    },
  ],
  [
    "5",
    {
      name: "Celestial Disc Gold Bracelet",
      price: "60780",
      product: "Bracelet",
      gender: "women",
    },
  ],
  [
    "6",
    {
      name: "Curved Chevron Gold Drop Earrings",
      price: "62456",
      product: "Earrings",
      gender: "women",
    },
  ],
  [
    "8",
    {
      name: "22 Karat Gold Floral Ring",
      price: "34544",
      product: "Finger Ring",
      gender: "women",
      stock: "Only 1 left!",
    },
  ],
  [
    "9",
    {
      name: "Simple Gold Chain",
      price: "52891",
      product: "Chain",
      gender: "women",
      stock: "Only 1 left!",
    },
  ],
]);

const files = await readdir(assetDir);
const numericImages = files
  .map((fileName) => {
    const match = fileName.match(/^(\d+)(?:\.(\d+))?\.(avif|jpe?g|png|webp)$/i);
    if (!match) return null;

    return {
      fileName,
      baseId: match[1],
      variantId: match[2] ?? null,
    };
  })
  .filter(Boolean);

const groups = new Map();

for (const image of numericImages) {
  if (!groups.has(image.baseId)) {
    groups.set(image.baseId, {
      image: null,
      hoverImage: null,
    });
  }

  const group = groups.get(image.baseId);
  const assetPath = `/assets/alljew/${image.fileName}`;

  if (!image.variantId) {
    group.image = assetPath;
  } else if (image.variantId === image.baseId) {
    group.hoverImage = assetPath;
  }
}

const generatedItems = [...groups.entries()]
  .filter(([, group]) => group.image)
  .sort(([firstId], [secondId]) => Number(firstId) - Number(secondId))
  .map(([baseId, group], index) => {
    const curated = curatedItems.get(baseId) ?? {};

    return {
      id: Number(baseId),
      name: curated.name ?? `Jewellery Design ${baseId}`,
      price: curated.price ?? null,
      jewelleryType: curated.jewelleryType ?? "Gold Jewellery",
      metal: curated.metal ?? "Gold",
      product: curated.product,
      gender: curated.gender ?? "women",
      stock: curated.stock,
      image: group.image,
      hoverImage: group.hoverImage ?? group.image,
      sortOrder: index + 1,
    };
  });

generatedItems.push({
  id: "him",
  name: "Balaji Gold Pendant for Men",
  price: "55788",
  jewelleryType: "Gold Jewellery",
  metal: "Gold",
  product: "Pendant",
  gender: "men",
  stock: "Only 1 left!",
  image: "/assets/alljew/him.webp",
  hoverImage: "/assets/alljew/him1.webp",
  sortOrder: generatedItems.length + 1,
});

await mkdir(outputDir, { recursive: true });
await writeFile(outputFile, `${JSON.stringify(generatedItems, null, 2)}\n`);

console.log(`Generated ${generatedItems.length} jewellery items at ${outputFile}`);
