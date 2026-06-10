import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const menu = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/data/menu.json"), "utf8")
);
const business = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/data/business.json"), "utf8")
);

const OUTPUT = path.join(ROOT, "public/menu.pdf");

const GOLD = "#C5A059";
const DARK = "#141414";
const MUTED = "#5C5C5C";
const PAGE_MARGIN = 48;
const FOOTER_HEIGHT = 36;

const categoryMap = Object.fromEntries(
  menu.categories.map((category) => [category.id, category.name.de])
);

const itemsByCategory = menu.categories
  .map((category) => ({
    id: category.id,
    label: category.name.de,
    items: menu.items.filter((item) => item.category === category.id),
  }))
  .filter((group) => group.items.length > 0);

function formatPrice(price) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function ensureSpace(doc, needed = 72) {
  const bottom = doc.page.height - PAGE_MARGIN - FOOTER_HEIGHT;
  if (doc.y + needed > bottom) {
    doc.addPage();
    drawPageHeader(doc);
  }
}

function drawPageHeader(doc) {
  doc
    .save()
    .rect(0, 0, doc.page.width, 42)
    .fill(DARK);
  doc
    .fillColor(GOLD)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("La Savi Steakhouse", PAGE_MARGIN, 15, {
      width: doc.page.width - PAGE_MARGIN * 2,
      align: "center",
    });
  doc.restore();
  doc.y = 58;
}

function drawFooter(doc, pageNumber) {
  const y = doc.page.height - PAGE_MARGIN;
  doc
    .strokeColor("#E8E0D0")
    .moveTo(PAGE_MARGIN, y - 10)
    .lineTo(doc.page.width - PAGE_MARGIN, y - 10)
    .stroke();
  doc
    .fillColor(MUTED)
    .font("Helvetica")
    .fontSize(8)
    .text(
      `${business.street}, ${business.postalCode} ${business.city} · ${business.phone} · kontakt@lasavi.de`,
      PAGE_MARGIN,
      y,
      { width: doc.page.width - PAGE_MARGIN * 2, align: "center" }
    );
  doc.text(`Seite ${pageNumber}`, PAGE_MARGIN, y + 12, {
    width: doc.page.width - PAGE_MARGIN * 2,
    align: "center",
  });
}

function drawCover(doc) {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#050505");

  const centerX = doc.page.width / 2;

  doc
    .fillColor(GOLD)
    .font("Helvetica-Bold")
    .fontSize(34)
    .text("La Savi Steakhouse", 0, 220, {
      width: doc.page.width,
      align: "center",
    });

  doc
    .fillColor("#E8E8E8")
    .font("Helvetica")
    .fontSize(13)
    .text("Premium Steaks · Grill · Halal", 0, 270, {
      width: doc.page.width,
      align: "center",
    });

  doc
    .fillColor(GOLD)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("100 % HALAL ZERTIFIZIERT", 0, 310, {
      width: doc.page.width,
      align: "center",
    });

  doc
    .fillColor("#B0B0B0")
    .font("Helvetica")
    .fontSize(11)
    .text(
      `${business.street}\n${business.postalCode} ${business.city}`,
      0,
      360,
      { width: doc.page.width, align: "center", lineGap: 4 }
    );

  doc
    .fillColor("#888888")
    .font("Helvetica")
    .fontSize(10)
    .text(business.openingHours.weekdays, 0, 420, {
      width: doc.page.width,
      align: "center",
    })
    .text(business.openingHours.sunday, 0, 438, {
      width: doc.page.width,
      align: "center",
    });

  doc
    .fillColor(GOLD)
    .font("Helvetica")
    .fontSize(10)
    .text("Digitale Speisekarte · lasavi.de", 0, doc.page.height - 80, {
      width: doc.page.width,
      align: "center",
    });
}

function drawCategoryTitle(doc, label) {
  ensureSpace(doc, 56);
  doc
    .moveTo(PAGE_MARGIN, doc.y)
    .lineTo(doc.page.width - PAGE_MARGIN, doc.y)
    .strokeColor(GOLD)
    .lineWidth(0.75)
    .stroke();
  doc.y += 10;
  doc
    .fillColor(DARK)
    .font("Helvetica-Bold")
    .fontSize(16)
    .text(label.toUpperCase(), PAGE_MARGIN, doc.y);
  doc.y += 8;
}

function drawMenuItem(doc, item) {
  const title = `${item.number}. ${item.name.de}`;
  const price = formatPrice(item.price);
  const description = item.description.de;
  const allergens =
    item.allergens?.length > 0
      ? `Allergene: ${item.allergens.join(", ")}`
      : "";

  const titleWidth = doc.page.width - PAGE_MARGIN * 2 - 90;
  doc.font("Helvetica-Bold").fontSize(11);
  const titleHeight = doc.heightOfString(title, { width: titleWidth });

  const descHeight = description
    ? doc.font("Helvetica").fontSize(9).heightOfString(description, {
        width: doc.page.width - PAGE_MARGIN * 2,
      })
    : 0;

  const allergenHeight = allergens
    ? doc.font("Helvetica").fontSize(8).heightOfString(allergens, {
        width: doc.page.width - PAGE_MARGIN * 2,
      })
    : 0;

  const blockHeight = titleHeight + descHeight + allergenHeight + 18;
  ensureSpace(doc, blockHeight);

  const rowY = doc.y;

  doc
    .fillColor(DARK)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text(title, PAGE_MARGIN, rowY, { width: titleWidth });

  doc
    .fillColor(GOLD)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text(price, doc.page.width - PAGE_MARGIN - 80, rowY, {
      width: 80,
      align: "right",
    });

  let nextY = rowY + titleHeight + 2;

  if (description) {
    doc
      .fillColor(MUTED)
      .font("Helvetica")
      .fontSize(9)
      .text(description, PAGE_MARGIN, nextY, {
        width: doc.page.width - PAGE_MARGIN * 2,
        lineGap: 1,
      });
    nextY = doc.y + 2;
  }

  if (allergens) {
    doc
      .fillColor("#8A7340")
      .font("Helvetica")
      .fontSize(8)
      .text(allergens, PAGE_MARGIN, nextY, {
        width: doc.page.width - PAGE_MARGIN * 2,
      });
    nextY = doc.y + 2;
  }

  doc.y = nextY + 8;
}

function generateMenuPdf() {
  const doc = new PDFDocument({
    size: "A4",
    margin: PAGE_MARGIN,
    autoFirstPage: false,
    info: {
      Title: "La Savi Steakhouse — Speisekarte",
      Author: business.name,
      Subject: "Speisekarte",
    },
  });

  const stream = fs.createWriteStream(OUTPUT);
  doc.pipe(stream);

  doc.addPage();
  drawCover(doc);

  doc.addPage({ margin: PAGE_MARGIN });
  drawPageHeader(doc);

  for (const group of itemsByCategory) {
    if (group.id === "highlights") continue;
    drawCategoryTitle(doc, group.label);
    for (const item of group.items) {
      drawMenuItem(doc, item);
    }
    doc.y += 6;
  }

  const pageRange = doc.bufferedPageRange();
  for (let i = 1; i < pageRange.count; i += 1) {
    doc.switchToPage(i);
    drawFooter(doc, i);
  }

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      const stats = fs.statSync(OUTPUT);
      console.log(
        `Generated ${OUTPUT} (${(stats.size / 1024).toFixed(1)} KB, ${pageRange.count} pages)`
      );
      resolve();
    });
    stream.on("error", reject);
  });
}

generateMenuPdf().catch((error) => {
  console.error(error);
  process.exit(1);
});
