#!/usr/bin/env nu

open temps.csv | group-by city | items { |city, groups|
    let avg = ($groups | get temperature | math avg);
    let result = {
        city: $city,
        avg: $avg
    };
    $result
}