#!/usr/bin/env -S deno run -A

import { writeCSV } from "jsr:@vslinko/csv";

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
const numRows = 1_000_000;
const fileName = "./temps.csv";

interface CityTemperature {
  city: string;
  temperature: number;
}

// Function to generate a random city temperature data
function generateCityTemperature(): CityTemperature {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const temperature = (Math.random() * 80 - 30).toFixed(2); // Random temperature between -30 and 50
  return { city, temperature: parseFloat(temperature) };
}

// Create an array to store city temperature data
const cityTemperatures: CityTemperature[] = [];

for (let i = 0; i < numRows; i++) {
  cityTemperatures.push(generateCityTemperature());
}

// Write data to CSV file
const csvFile = await Deno.open(fileName, { write: true, create: true });
await writeCSV(csvFile, ["city", "temperature"]);
await writeCSV(
  csvFile,
  cityTemperatures.map((ct) => [ct.city, ct.temperature.toString()])
);
csvFile.close();

console.log(
  `Generated ${numRows} rows of city temperature data in ${fileName}`
);
