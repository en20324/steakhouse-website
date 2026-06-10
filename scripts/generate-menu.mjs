import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const EMPTY_LANGS = {
  fr: "",
  nl: "",
  pl: "",
  ar: "",
  uk: "",
  es: "",
  it: "",
};

function loc(de, en, tr) {
  return { de, en, tr, ...EMPTY_LANGS };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

const categories = [
  {
    id: "highlights",
    name: loc("Beliebt", "Highlights", "Popüler"),
  },
  {
    id: "tagesgerichte",
    name: loc("Tagesgerichte", "Daily Specials", "Günün Yemekleri"),
  },
  {
    id: "suppen",
    name: loc("Suppen", "Soups", "Çorbalar"),
  },
  {
    id: "salate",
    name: loc("Salate", "Salads", "Salatalar"),
  },
  {
    id: "wet-aged-doner",
    name: loc("Wet Aged Spezial Döner", "Wet Aged Special Döner", "Wet Aged Özel Döner"),
  },
  {
    id: "grillgerichte",
    name: loc("Grillgerichte", "Grill Dishes", "Izgara Yemekleri"),
  },
  {
    id: "steakspezialitaeten",
    name: loc("Steakspezialitäten", "Beef Steaks", "Dana Steaks"),
  },
  {
    id: "buffalo-steaks",
    name: loc("Büffel Steaks", "Buffalo Steaks", "Manda Steaks"),
  },
  {
    id: "wagyu-steaks",
    name: loc("Wagyu Steaks", "Wagyu Steaks", "Wagyu Steaks"),
  },
  {
    id: "teiggerichte",
    name: loc("Teiggerichte", "Pastry Dishes", "Hamur İşleri"),
  },
  {
    id: "beilagen",
    name: loc("Beilagen", "Side Dishes", "Garnitürler"),
  },
  {
    id: "saucen",
    name: loc("Saucen", "Sauces", "Soslar"),
  },
  {
    id: "nachtisch",
    name: loc("Nachtisch", "Desserts", "Tatlılar"),
  },
  {
    id: "getraenke",
    name: loc("Getränke", "Beverages", "İçecekler"),
  },
];

/** @type {Array<{category:string, price:number, name:ReturnType<typeof loc>, description:ReturnType<typeof loc>, allergens:string[], tags:string[]}>} */
const rawItems = [
  // Tagesgerichte
  {
    category: "tagesgerichte",
    price: 14.9,
    name: loc("Menü 2 — Hähnchen Tontopf", "Menu 2 — Chicken Pot", "Menü 2 — Tavuk Tencere"),
    description: loc("Hähnchen Tontopf mit Beilage nach Wahl und Brotstreifen.", "Chicken pot served with side of choice and bread.", "Seçilen garnitür ve ekmek ile tavuk tencere."),
    allergens: [],
    tags: ["halal"],
  },
  {
    category: "tagesgerichte",
    price: 23.9,
    name: loc("Menü 4 — Garnelen Tontopf", "Menu 4 — Prawn Pot", "Menü 4 — Karides Tencere"),
    description: loc("Garnelen Tontopf mit Beilage nach Wahl und Brotstreifen.", "Prawn pot served with side of choice and bread.", "Seçilen garnitür ve ekmek ile karides tencere."),
    allergens: ["B", "R"],
    tags: [],
  },
  {
    category: "tagesgerichte",
    price: 17.9,
    name: loc("Menü 1 — Lammfleisch Tontopf", "Menu 1 — Lamb Pot", "Menü 1 — Kuzu Tencere"),
    description: loc("Lammfleisch Tontopf mit Beilage nach Wahl und Brotstreifen.", "Lamb pot served with side of choice and bread.", "Seçilen garnitür ve ekmek ile kuzu tencere."),
    allergens: [],
    tags: ["halal"],
  },
  {
    category: "tagesgerichte",
    price: 12.9,
    name: loc("Menü 5 — Gemüse Tontopf", "Menu 5 — Vegetable Pot", "Menü 5 — Sebze Tencere"),
    description: loc("Gemüse Tontopf mit Beilage nach Wahl und Brotstreifen.", "Vegetable pot served with side of choice and bread.", "Seçilen garnitür ve ekmek ile sebze tencere."),
    allergens: [],
    tags: ["vegetarian"],
  },
  {
    category: "tagesgerichte",
    price: 15.9,
    name: loc("Menü 3 — Lammfrikadellen Tontopf", "Menu 3 — Lamb Meatball Pot", "Menü 3 — Kuzu Köfte Tencere"),
    description: loc("Lammfrikadellen Tontopf mit Beilage nach Wahl und Brotstreifen.", "Lamb meatball pot with side of choice and bread.", "Seçilen garnitür ve ekmek ile kuzu köfte tencere."),
    allergens: ["A", "C"],
    tags: ["halal"],
  },
  // Suppen
  {
    category: "suppen",
    price: 5.9,
    name: loc("Linsensuppe", "Lentil Soup", "Mercimek Çorbası"),
    description: loc("Wärmende Suppe aus roten Linsen, aromatisch gewürzt und cremig.", "Warming red lentil soup, aromatic and creamy.", "Kırmızı mercimekten aromatik, kremsi çorba."),
    allergens: ["L"],
    tags: ["vegetarian"],
  },
  {
    category: "suppen",
    price: 7.9,
    name: loc("Lammfleischsuppe", "Lamb Soup", "Kuzu Çorbası"),
    description: loc("Herzhafte Suppe mit zartem Lammfleisch, Gemüse und Kräutern.", "Hearty soup with tender lamb, vegetables and herbs.", "Yumuşak kuzu eti, sebze ve otlarla çorba."),
    allergens: ["L"],
    tags: ["halal"],
  },
  {
    category: "suppen",
    price: 6.9,
    name: loc("Hähnchensuppe", "Chicken Soup", "Tavuk Çorbası"),
    description: loc("Wärmende Suppe mit zartem Hähnchenfleisch und feinem Gemüse.", "Warming soup with tender chicken and vegetables.", "Yumuşak tavuk eti ve sebzelerle çorba."),
    allergens: ["L"],
    tags: ["halal"],
  },
  // Salate
  {
    category: "salate",
    price: 5.9,
    name: loc("Hirtensalat", "Shepherd's Salad", "Çoban Salatası"),
    description: loc("Frischer Salat mit Tomaten, Gurken, Zwiebeln, Paprika und Feta.", "Fresh salad with tomatoes, cucumber, onion, pepper and feta.", "Domates, salatalık, soğan, biber ve feta ile taze salata."),
    allergens: ["G"],
    tags: ["vegetarian", "bestseller"],
  },
  {
    category: "salate",
    price: 8.9,
    name: loc("Kräuter-Blätter-Salat", "Herb Leaf Salad", "Ot Yapraklı Salata"),
    description: loc("Leichter Salat mit verschiedenen Blattsalaten und frischen Kräutern.", "Light salad with mixed leaves and fresh herbs.", "Karışık yeşillikler ve taze otlarla hafif salata."),
    allergens: [],
    tags: ["vegetarian"],
  },
  {
    category: "salate",
    price: 7.9,
    name: loc("Hirtensalat-Feta Käse", "Shepherd's Salad with Feta", "Feta Peynirli Çoban Salatası"),
    description: loc("Mit Granatapfel- oder Kräuterdressing — frisch und aromatisch.", "With pomegranate or herb dressing — fresh and aromatic.", "Nar veya ot sosu ile — taze ve aromatik."),
    allergens: ["G"],
    tags: ["vegetarian", "bestseller", "highlights"],
  },
  {
    category: "salate",
    price: 11.9,
    name: loc("Kräuter Blätter Salat-Büffelmozzarella", "Herb Salad with Buffalo Mozzarella", "Manda Mozzarellalı Ot Salatası"),
    description: loc("Frische Kräuterblätter mit cremigem Büffelmozzarella.", "Fresh herb leaves with creamy buffalo mozzarella.", "Kremsi manda mozzarellalı taze ot yapraklı salata."),
    allergens: ["G"],
    tags: ["vegetarian", "highlights"],
  },
  // Wet Aged Döner
  {
    category: "wet-aged-doner",
    price: 7.9,
    name: loc("Pommes Döner", "Fries Döner", "Patates Döner"),
    description: loc("Pommes frites mit saftigem Wet Aged Dönerfleisch.", "Crispy fries topped with wet aged döner meat.", "Wet aged döner eti ile patates kızartması."),
    allergens: ["A"],
    tags: ["halal", "bestseller"],
  },
  {
    category: "wet-aged-doner",
    price: 16.9,
    name: loc("Wet Aged Iskender Döner", "Wet Aged Iskender Döner", "Wet Aged İskender Döner"),
    description: loc("Mit Joghurtsauce, Butter und Tomatensoße — ein Klassiker.", "With yogurt sauce, butter and tomato sauce — a classic.", "Yoğurt sosu, tereyağı ve domates sosu ile klasik lezzet."),
    allergens: ["A", "G"],
    tags: ["halal", "bestseller", "highlights"],
  },
  {
    category: "wet-aged-doner",
    price: 10.9,
    name: loc("Wet Aged Kalb Dürüm Döner", "Wet Aged Veal Dürüm", "Wet Aged Dana Dürüm"),
    description: loc("Im Dürüm mit frischem Salat.", "Wrapped dürüm with fresh salad.", "Taze salata ile dürüm."),
    allergens: ["A", "G"],
    tags: ["halal"],
  },
  {
    category: "wet-aged-doner",
    price: 9.9,
    name: loc("Wet Aged Kalb Döner", "Wet Aged Veal Döner", "Wet Aged Dana Döner"),
    description: loc("Im Brot — hausgemacht und saftig.", "In bread — homemade and juicy.", "Ekmek arası — ev yapımı ve sulu."),
    allergens: ["A", "G"],
    tags: ["halal", "bestseller"],
  },
  {
    category: "wet-aged-doner",
    price: 15.9,
    name: loc("Wet Aged Kalb Döner Teller", "Wet Aged Veal Döner Plate", "Wet Aged Dana Döner Tabağı"),
    description: loc("Mit Salat und Beilage nach Wahl.", "With salad and side of choice.", "Salata ve seçilen garnitür ile."),
    allergens: ["A", "G"],
    tags: ["halal"],
  },
  {
    category: "wet-aged-doner",
    price: 9.9,
    name: loc("Wet Aged Hähnchen Döner", "Wet Aged Chicken Döner", "Wet Aged Tavuk Döner"),
    description: loc("Im Brot — zart und aromatisch.", "In bread — tender and aromatic.", "Ekmek arası — yumuşak ve aromatik."),
    allergens: ["A", "G"],
    tags: ["halal"],
  },
  {
    category: "wet-aged-doner",
    price: 15.9,
    name: loc("Wet Aged Hähnchen Döner Teller", "Wet Aged Chicken Döner Plate", "Wet Aged Tavuk Döner Tabağı"),
    description: loc("Mit Salat und Beilage nach Wahl.", "With salad and side of choice.", "Salata ve seçilen garnitür ile."),
    allergens: ["A", "G"],
    tags: ["halal"],
  },
  {
    category: "wet-aged-doner",
    price: 10.9,
    name: loc("Wet Aged Hähnchen Dürüm Döner", "Wet Aged Chicken Dürüm", "Wet Aged Tavuk Dürüm"),
    description: loc("Im Dürüm mit frischem Salat.", "Dürüm wrap with fresh salad.", "Taze salata ile dürüm."),
    allergens: ["A", "G"],
    tags: ["halal"],
  },
  // Grillgerichte
  {
    category: "grillgerichte",
    price: 24.9,
    name: loc("Lammkotelett", "Lamb Chops", "Kuzu Pirzola"),
    description: loc("Vom Grill mit Beilage nach Wahl.", "From the grill with side of choice.", "Izgaradan, seçilen garnitür ile."),
    allergens: [],
    tags: ["halal"],
  },
  {
    category: "grillgerichte",
    price: 24.9,
    name: loc("Gemischter Grill Teller", "Mixed Grill Plate", "Karışık Izgara Tabağı"),
    description: loc("Auswahl unserer Grill-Spezialitäten mit Beilage nach Wahl.", "Selection of grill specialties with side of choice.", "Izgara spesiyalleri seçkisi, garnitür ile."),
    allergens: [],
    tags: ["halal", "bestseller", "highlights"],
  },
  {
    category: "grillgerichte",
    price: 19.9,
    name: loc("Urfa Teller", "Urfa Plate", "Urfa Tabağı"),
    description: loc("Mit würzigem Hackspieß vom Grill.", "With spiced minced skewer from the grill.", "Baharatlı kıyma şiş ile."),
    allergens: [],
    tags: ["halal"],
  },
  {
    category: "grillgerichte",
    price: 19.9,
    name: loc("Adana Teller (scharf)", "Adana Plate (spicy)", "Adana Tabağı (acılı)"),
    description: loc("Mit scharfem Hackspieß vom Grill.", "With spicy minced skewer from the grill.", "Acılı kıyma şiş ile."),
    allergens: [],
    tags: ["halal", "spicy"],
  },
  {
    category: "grillgerichte",
    price: 15.9,
    name: loc("Frikadellen", "Lamb Meatballs", "Köfte"),
    description: loc("Mit Lammfleisch vom Grill.", "Lamb meatballs from the grill.", "Izgaradan kuzu köfte."),
    allergens: ["A", "C"],
    tags: ["halal"],
  },
  {
    category: "grillgerichte",
    price: 23.9,
    name: loc("Lammspieß Teller", "Lamb Skewer Plate", "Kuzu Şiş Tabağı"),
    description: loc("Mit Beilage nach Wahl.", "With side of choice.", "Seçilen garnitür ile."),
    allergens: [],
    tags: ["halal"],
  },
  {
    category: "grillgerichte",
    price: 9.9,
    name: loc("Lammspieß Dürüm", "Lamb Skewer Dürüm", "Kuzu Şiş Dürüm"),
    description: loc("Im Dürüm.", "In dürüm wrap.", "Dürüm içinde."),
    allergens: ["A"],
    tags: ["halal"],
  },
  {
    category: "grillgerichte",
    price: 9.9,
    name: loc("Hähnchenspieß Dürüm", "Chicken Skewer Dürüm", "Tavuk Şiş Dürüm"),
    description: loc("Im Dürüm.", "In dürüm wrap.", "Dürüm içinde."),
    allergens: ["A"],
    tags: ["halal"],
  },
  {
    category: "grillgerichte",
    price: 9.9,
    name: loc("Adana Dürüm", "Adana Dürüm", "Adana Dürüm"),
    description: loc("Mit Hackspieß im Dürüm.", "Minced skewer in dürüm.", "Kıyma şişli dürüm."),
    allergens: ["A"],
    tags: ["halal", "spicy"],
  },
  {
    category: "grillgerichte",
    price: 17.9,
    name: loc("Hähnchenspieß", "Chicken Skewer", "Tavuk Şiş"),
    description: loc("Mit Beilage nach Wahl.", "With side of choice.", "Seçilen garnitür ile."),
    allergens: [],
    tags: ["halal"],
  },
  {
    category: "grillgerichte",
    price: 17.9,
    name: loc("Hähnchenkotelett", "Chicken Chops", "Tavuk Pirzola"),
    description: loc("Mit Beilage nach Wahl.", "With side of choice.", "Seçilen garnitür ile."),
    allergens: [],
    tags: ["halal"],
  },
  {
    category: "grillgerichte",
    price: 59.9,
    name: loc("Sultan Kebap", "Sultan Kebap", "Sultan Kebap"),
    description: loc("Premium-Grillplatte für Genießer mit Beilage nach Wahl.", "Premium grill platter for connoisseurs with side of choice.", "Seçilen garnitür ile premium ızgara tabağı."),
    allergens: [],
    tags: ["halal", "premium"],
  },
  // Steakspezialitäten
  {
    category: "steakspezialitaeten",
    price: 49.9,
    name: loc("Cowboy Steak", "Cowboy Steak", "Cowboy Steak"),
    description: loc("Dry Aged Rumpsteak ca. 1000 g — kräftig und saftig.", "Dry aged rump steak approx. 1000 g — bold and juicy.", "Dry aged bonfilet yaklaşık 1000 g."),
    allergens: [],
    tags: ["halal", "premium"],
  },
  {
    category: "steakspezialitaeten",
    price: 49.9,
    name: loc("T-Bone Steak", "T-Bone Steak", "T-Bone Steak"),
    description: loc("Dry Aged T-Bone ca. 1000 g vom Grill.", "Dry aged T-bone approx. 1000 g from the grill.", "Dry aged T-bone yaklaşık 1000 g."),
    allergens: [],
    tags: ["halal", "premium"],
  },
  {
    category: "steakspezialitaeten",
    price: 39.9,
    name: loc("Filet Steak ca. 300 gr", "Fillet Steak approx. 300 g", "Fileto Steak yakl. 300 gr"),
    description: loc("Zartes Rinderfilet, butterweich und auf den Punkt gegart.", "Tender beef fillet, cooked to perfection.", "Yumuşacık dana fileto, mükemmel pişmiş."),
    allergens: [],
    tags: ["halal", "premium", "highlights"],
  },
  {
    category: "steakspezialitaeten",
    price: 34.9,
    name: loc("Rumpsteak ca. 350 gr", "Rump Steak approx. 350 g", "Bonfilet yakl. 350 gr"),
    description: loc("Saftiges Dry Aged Rumpsteak vom Grill.", "Juicy dry aged rump steak from the grill.", "Izgaradan sulu dry aged bonfilet."),
    allergens: [],
    tags: ["halal"],
  },
  // Büffel
  {
    category: "buffalo-steaks",
    price: 44.9,
    name: loc("Büffel Filet Steak ca. 250 gr", "Buffalo Fillet approx. 250 g", "Manda Fileto yakl. 250 gr"),
    description: loc("Exklusives Büffel-Filet mit intensiver Marmorierung.", "Exclusive buffalo fillet with rich marbling.", "Yoğun mermerli manda fileto."),
    allergens: [],
    tags: ["premium"],
  },
  {
    category: "buffalo-steaks",
    price: 44.9,
    name: loc("Büffel Rib Eye Steak ca. 350 gr", "Buffalo Rib Eye approx. 350 g", "Manda Rib Eye yakl. 350 gr"),
    description: loc("Saftiges Büffel-Ribeye vom Grill.", "Juicy buffalo rib eye from the grill.", "Izgaradan sulu manda rib eye."),
    allergens: [],
    tags: ["premium"],
  },
  // Wagyu
  {
    category: "wagyu-steaks",
    price: 99.0,
    name: loc("Wagyu Filet ca. 200 gr", "Wagyu Fillet approx. 200 g", "Wagyu Fileto yakl. 200 gr"),
    description: loc("Exklusives Wagyu-Filet von höchster Marmorierung.", "Exclusive Wagyu fillet with supreme marbling.", "Üstün mermerli Wagyu fileto."),
    allergens: [],
    tags: ["premium", "bestseller", "highlights"],
  },
  {
    category: "wagyu-steaks",
    price: 129.0,
    name: loc("Wagyu Ribeye ca. 300 gr", "Wagyu Ribeye approx. 300 g", "Wagyu Ribeye yakl. 300 gr"),
    description: loc("Premium Wagyu Ribeye — ein außergewöhnliches Geschmackserlebnis.", "Premium Wagyu ribeye — an extraordinary experience.", "Premium Wagyu ribeye — olağanüstü lezzet."),
    allergens: [],
    tags: ["premium", "highlights"],
  },
  // Teiggerichte
  {
    category: "teiggerichte",
    price: 4.9,
    name: loc("Lahmacun Sade", "Plain Lahmacun", "Sade Lahmacun"),
    description: loc("Türkische Pizza ohne Belag — knusprig und klassisch.", "Turkish flatbread without topping — crispy and classic.", "Sussuz Türk pidesi — çıtır ve klasik."),
    allergens: ["A"],
    tags: ["vegetarian"],
  },
  {
    category: "teiggerichte",
    price: 10.9,
    name: loc("Lahmacun Dönerli", "Lahmacun with Döner", "Dönerli Lahmacun"),
    description: loc("Türkische Pizza mit Dönerfleisch.", "Turkish flatbread with döner meat.", "Döner etli lahmacun."),
    allergens: ["A"],
    tags: ["halal"],
  },
  {
    category: "teiggerichte",
    price: 11.9,
    name: loc("Türkische Tortellini", "Turkish Manti", "Mantı"),
    description: loc("Gefüllt mit Hackfleisch, Butter und Joghurtsauce.", "Filled with minced meat, butter and yogurt sauce.", "Kıyma, tereyağı ve yoğurt sosu ile."),
    allergens: ["A", "G", "C"],
    tags: ["halal"],
  },
  {
    category: "teiggerichte",
    price: 11.9,
    name: loc("Lammfleisch Pide", "Lamb Pide", "Kuzu Pide"),
    description: loc("Teigschiffchen mit Lammfleischwürfeln und Gouda.", "Boat pastry with lamb cubes and Gouda.", "Kuzu küpleri ve gouda ile pide."),
    allergens: ["A", "G"],
    tags: ["halal"],
  },
  {
    category: "teiggerichte",
    price: 11.9,
    name: loc("Dönerfleisch Pide", "Döner Pide", "Döner Pide"),
    description: loc("Teigschiffchen mit saftigem Dönerfleisch.", "Boat pastry with juicy döner meat.", "Sulu döner eti ile pide."),
    allergens: ["A", "G"],
    tags: ["halal"],
  },
  {
    category: "teiggerichte",
    price: 9.9,
    name: loc("Gemüse Pide", "Vegetable Pide", "Sebze Pide"),
    description: loc("Teigschiffchen mit frischem Gemüse.", "Boat pastry with fresh vegetables.", "Taze sebzelerle pide."),
    allergens: ["A", "G"],
    tags: ["vegetarian"],
  },
  {
    category: "teiggerichte",
    price: 5.9,
    name: loc("Lahmacun Dürüm", "Lahmacun Dürüm", "Lahmacun Dürüm"),
    description: loc("Türkische Pizza mit Salat im Dürüm.", "Turkish flatbread wrap with salad.", "Salatalı lahmacun dürüm."),
    allergens: ["A"],
    tags: ["halal"],
  },
  // Beilagen
  {
    category: "beilagen",
    price: 2.9,
    name: loc("Pommes Frites", "French Fries", "Patates Kızartması"),
    description: loc("Knusprig goldbraun frittiert — außen knusprig, innen weich.", "Crispy golden fries — crunchy outside, soft inside.", "Dışı çıtır, içi yumuşak altın patates."),
    allergens: [],
    tags: [],
  },
  {
    category: "beilagen",
    price: 4.9,
    name: loc("Rahmspinat", "Creamed Spinach", "Kremalı Ispanak"),
    description: loc("Cremiger Rahmspinat als Beilage.", "Creamy spinach side dish.", "Kremalı ıspanak garnitür."),
    allergens: ["G"],
    tags: ["vegetarian"],
  },
  {
    category: "beilagen",
    price: 4.9,
    name: loc("Bratkartoffeln mit Rosmarin", "Pan-Fried Potatoes with Rosemary", "Biberiyeli Rosto Patates"),
    description: loc("Goldbraune Bratkartoffeln mit Rosmarin.", "Golden pan-fried potatoes with rosemary.", "Biberiyeli rosto patates."),
    allergens: [],
    tags: ["vegetarian"],
  },
  {
    category: "beilagen",
    price: 5.0,
    name: loc("Süßkartoffelpommes", "Sweet Potato Fries", "Tatlı Patates Kızartması"),
    description: loc("Knusprige Süßkartoffelpommes.", "Crispy sweet potato fries.", "Çıtır tatlı patates kızartması."),
    allergens: [],
    tags: ["vegetarian"],
  },
  // Saucen
  {
    category: "saucen",
    price: 1.0,
    name: loc("Scharfe Sauce", "Hot Sauce", "Acı Sos"),
    description: loc("Intensive Sauce mit angenehmer Schärfe.", "Intense sauce with pleasant heat.", "Hoş acılık veren yoğun sos."),
    allergens: [],
    tags: [],
  },
  {
    category: "saucen",
    price: 1.0,
    name: loc("Ketchup", "Ketchup", "Ketçap"),
    description: loc("Klassische süß-säuerliche Tomatensauce.", "Classic sweet and tangy tomato sauce.", "Klasik tatlı-ekşi domates sosu."),
    allergens: [],
    tags: [],
  },
  {
    category: "saucen",
    price: 1.0,
    name: loc("Mayonnaise", "Mayonnaise", "Mayonez"),
    description: loc("Cremige Mayonnaise.", "Creamy mayonnaise.", "Kremalı mayonez."),
    allergens: ["C"],
    tags: [],
  },
  {
    category: "saucen",
    price: 1.0,
    name: loc("Joghurtsauce", "Yogurt Sauce", "Yoğurt Sosu"),
    description: loc("Cremige Joghurtsauce mit frischen Kräutern.", "Creamy yogurt sauce with fresh herbs.", "Taze otlu yoğurt sosu."),
    allergens: ["G"],
    tags: [],
  },
  {
    category: "saucen",
    price: 1.0,
    name: loc("Cocktailsauce", "Cocktail Sauce", "Cocktail Sos"),
    description: loc("Cremige Sauce mit süßlicher Würze.", "Creamy sauce with a sweet note.", "Hafif tatlı kremalı sos."),
    allergens: ["C"],
    tags: [],
  },
  // Nachtisch
  {
    category: "nachtisch",
    price: 4.9,
    name: loc("Milchreis", "Rice Pudding", "Sütlaç"),
    description: loc("Mit Vanille — cremig und süß.", "With vanilla — creamy and sweet.", "Vanilyalı — kremsi ve tatlı."),
    allergens: ["G"],
    tags: ["vegetarian"],
  },
  {
    category: "nachtisch",
    price: 7.9,
    name: loc("Künefe", "Künefe", "Künefe"),
    description: loc("Fadenteig mit Käse, goldbraun gebacken und mit Sirup verfeinert.", "Shredded phyllo with cheese, baked golden with syrup.", "Peynirli tel kadayıf, şerbetli."),
    allergens: ["A", "G"],
    tags: ["vegetarian", "bestseller", "highlights"],
  },
  {
    category: "nachtisch",
    price: 7.9,
    name: loc("Katmer", "Katmer", "Katmer"),
    description: loc("Gefalteter Teig mit Sahne und Pistazien, warm serviert.", "Folded pastry with cream and pistachios, served warm.", "Krema ve antep fıstığı ile katmer, sıcak."),
    allergens: ["A", "G", "H"],
    tags: ["vegetarian", "bestseller", "highlights"],
  },
  // Getränke (Auswahl — vollständige Liste)
  {
    category: "getraenke",
    price: 2.9,
    name: loc("Coca-Cola 0,33l", "Coca-Cola 0.33l", "Coca-Cola 0,33l"),
    description: loc("Erfrischend und klassisch.", "Refreshing and classic.", "Ferahlatan ve klasik."),
    allergens: [],
    tags: [],
  },
  {
    category: "getraenke",
    price: 2.9,
    name: loc("Fanta Orange 0,33l", "Fanta Orange 0.33l", "Fanta Portakal 0,33l"),
    description: loc("Spritzig erfrischend.", "Sparkling and refreshing.", "Gazlı ve ferahlatıcı."),
    allergens: [],
    tags: [],
  },
  {
    category: "getraenke",
    price: 2.9,
    name: loc("Sprite 0,33l", "Sprite 0.33l", "Sprite 0,33l"),
    description: loc("Zitronig-limettenfrisch.", "Lemon-lime refreshment.", "Limonlu ferahlık."),
    allergens: [],
    tags: [],
  },
  {
    category: "getraenke",
    price: 2.9,
    name: loc("Mezzo Mix 0,33l", "Mezzo Mix 0.33l", "Mezzo Mix 0,33l"),
    description: loc("Cola trifft Orange.", "Cola meets orange.", "Kola ve portakal."),
    allergens: [],
    tags: [],
  },
  {
    category: "getraenke",
    price: 4.9,
    name: loc("Mineralwasser mit Kohlensäure 0,75l", "Sparkling Mineral Water 0.75l", "Maden Suyu Gazlı 0,75l"),
    description: loc("Erfrischendes Mineralwasser mit Kohlensäure.", "Sparkling mineral water.", "Gazlı maden suyu."),
    allergens: [],
    tags: [],
  },
  {
    category: "getraenke",
    price: 2.5,
    name: loc("Mineralwasser still 0,75l", "Still Mineral Water 0.75l", "Maden Suyu Sade 0,75l"),
    description: loc("Stilles Mineralwasser.", "Still mineral water.", "Sade maden suyu."),
    allergens: [],
    tags: [],
  },
  {
    category: "getraenke",
    price: 1.9,
    name: loc("Ayran 0,33l", "Ayran 0.33l", "Ayran 0,33l"),
    description: loc("Traditioneller Joghurtgetränk.", "Traditional yogurt drink.", "Geleneksel yoğurt içeceği."),
    allergens: ["G"],
    tags: [],
  },
  {
    category: "getraenke",
    price: 2.5,
    name: loc("Red Bull 0,25l", "Red Bull 0.25l", "Red Bull 0,25l"),
    description: loc("Energy Drink.", "Energy drink.", "Enerji içeceği."),
    allergens: [],
    tags: [],
  },
];

const highlightIds = new Set(
  rawItems
    .filter((item) => item.tags.includes("highlights") || item.tags.includes("bestseller"))
    .map((item) => item.name.de)
);

const items = rawItems.map((item, index) => {
  const id = String(index + 1).padStart(3, "0");
  const number = String(index + 1);
  const imageSlug = slugify(item.name.de);

  return {
    id,
    number,
    category: item.category,
    price: item.price,
    currency: "EUR",
    name: item.name,
    description: item.description,
    tags: item.tags.filter((t) => t !== "highlights"),
    allergens: item.allergens,
    image: `/images/menu/${imageSlug}.webp`,
  };
});

// Beliebt category shows cross-category bestsellers via duplicate virtual entries is wrong.
// Instead: items with highlights tag also searchable under highlights filter in UI.
// Add virtual highlight entries for top sellers
const highlightItems = items
  .filter((item) =>
    rawItems.find((r) => r.name.de === item.name.de)?.tags.includes("highlights") ||
    rawItems.find((r) => r.name.de === item.name.de)?.tags.includes("bestseller")
  )
  .slice(0, 12)
  .map((item) => ({ ...item, category: "highlights" }));

// Dedupe: keep primary category items, add highlights as separate list only in categories filter
// MenuPageContent filters by category === id. For highlights, include items where tags has bestseller OR category highlights
// Simpler: don't duplicate. Update MenuPageContent to filter highlights by tag.

const menu = {
  categories,
  items,
};

writeFileSync(
  join(__dirname, "../src/data/menu.json"),
  JSON.stringify(menu, null, 2) + "\n"
);

console.log(`Generated ${items.length} menu items in ${categories.length} categories.`);
