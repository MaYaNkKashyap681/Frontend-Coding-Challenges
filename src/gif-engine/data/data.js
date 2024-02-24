import fs from 'fs';

export const getGifData = () => {
  try {
    return JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
  } catch (err) {
    console.error("Error reading or parsing data:", err);
    return null;
  }
}
const data = getGifData();
if (data) {
  console.log("Type of data:", typeof data);
} else {
  console.log("No data returned.");
}

