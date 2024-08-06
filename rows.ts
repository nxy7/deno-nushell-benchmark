#!/usr/bin/env -S deno run -A

import { readCSV } from "jsr:@vslinko/csv";
import { groupBy } from "https://deno.land/std@0.177.0/collections/mod.ts";
import { average } from "https://deno.land/x/simplestatistics@v7.8.0/index.js";

const file = await Deno.open("temps.csv");
const rows: { city: string; temperature: number }[] = [];

for await (const row of readCSV(file, { fromLine: 1 })) {
  const elements = [];
  for await (const cell of row) {
    elements.push(cell);
  }
  rows.push({ city: elements[0], temperature: parseFloat(elements[1]) });
}
file.close();

const groupedByCity = groupBy(rows, (row) => row.city);
const citiesWithAverages = Object.entries(groupedByCity).map(
  ([city, group]) => {
    return {
      city,
      avgTemperature: average(group!.map((t) => t.temperature)),
    };
  }
);

console.log(citiesWithAverages);
