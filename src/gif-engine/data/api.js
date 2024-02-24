import axios from 'axios';
import fs from 'fs';

const fetchDummyData = async () => {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/trending?api_key=dWhHx4ASEutwPYhE1MAQ4DleOYLrgktp&limit=20');
    const data = response.data;

    fs.writeFile('./data.json', JSON.stringify(data), (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("Data added successfully");
      }
    });
  } catch (err) {
    console.error("Error while fetching the data:", err.message);
  }
}

fetchDummyData();



fetchDummyData();