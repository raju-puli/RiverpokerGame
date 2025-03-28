const fs = require("fs");
const path = require("path");

const manifestPath = path.join(__dirname, "../public/manifest.json");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const now = new Date();
const istOffset = 5.5 * 60 * 60 * 1000;
const istDate = new Date(now.getTime() + istOffset);

const formattedTime = istDate.toISOString().replace("T", " ").slice(0, 19); 

manifest.buildTime = formattedTime;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

console.log(`Manifest updated with build time: ${formattedTime}`);
