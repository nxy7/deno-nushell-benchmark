# Deno vs Nushell

## Motivation

Why would anyone benchmark Deno against Nushell? My thesis is that Deno could be great for shell scripts, you have
whole JS ecosystem to use without it's complexities. You don't need package.json, you don't need eslint/prettier.
Just write `myScript.ts` file with shebang at the top and you've got yourself a pretty nice script.
This ease of use is very nice and I appreciate Deno std library which is quiet extensive.

Nushell is shell for new era, that unlike bash works with objects instead of strings. I like some things about nushell and
dislike others. I'm daily driving it for a long time and it's language doesn't feel very intuitive to me. I kind of wish they
made it more TS-like so it would be more familiar (like use () brackets instead of []). It's somewhere between rust and TS it's also
it's own thing which is a bit awkward. I think the Nu language is my least liked thing about the shell, other than that it's pretty good.

# Benchmarks

I've prepared just two benchmarks. One is regular old fibbonaci sequence calculation using recursion. Nushell has some limit on recursion (50 depth),
so I've only calculated fib(25).

The other benchmark is more interesting. It's calculating temperature averages for 1 milion CSV rows distributed between five cities. Pretty similar
to `1 billion rows challenge` but at smaller scale. I'm generating the CSV with another script, and then calculating averages.

Both benchmarks were ran 5 times.

## Fibbonaci sequence

Nushell results:
```
            Mean        Std.Dev.    Min         Median      Max
real        0.361       0.016       0.344       0.355       0.381       
user        0.351       0.016       0.335       0.342       0.373       
sys         0.008       0.001       0.006       0.007       0.010       
maxrss      29469       221         29144       29580       29724       
minflt      3204        8           3193        3207        3216        
```

Deno results:
```
            Mean        Std.Dev.    Min         Median      Max
real        0.022       0.003       0.018       0.022       0.026       
user        0.010       0.001       0.009       0.010       0.011       
sys         0.012       0.001       0.011       0.011       0.014       
maxrss      54950       224         54644       54936       55272       
minflt      3756        1           3754        3757        3758        
```

Deno was 16 times faster and used 2x times more memory than Nushell.

## 1 milion rows

Nu output:
```
╭───┬─────────────┬───────╮
│ # │    city     │  avg  │
├───┼─────────────┼───────┤
│ 0 │ Houston     │ 10.03 │
│ 1 │ Phoenix     │  9.93 │
│ 2 │ New York    │  9.93 │
│ 3 │ Chicago     │  9.98 │
│ 4 │ Los Angeles │  9.96 │
╰───┴─────────────┴───────╯
```

Nushell results:
```
            Mean        Std.Dev.    Min         Median      Max
real        0.942       0.032       0.900       0.932       0.997       
user        0.732       0.024       0.706       0.729       0.774       
sys         0.205       0.009       0.191       0.203       0.217       
maxrss      527409      350         526948      527660      527740      
minflt      146785      383         146588      146595      147553      
```

Deno output:
```
[
  { city: "Houston", avgTemperature: 10.033709541204631 },
  { city: "Phoenix", avgTemperature: 9.932006789287124 },
  { city: "New York", avgTemperature: 9.933804987573572 },
  { city: "Chicago", avgTemperature: 9.97538478917931 },
  { city: "Los Angeles", avgTemperature: 9.956839679748104 }
]
```

Deno results:
```
            Mean        Std.Dev.    Min         Median      Max
real        1.861       0.020       1.839       1.851       1.896       
user        2.085       0.022       2.058       2.080       2.123       
sys         0.166       0.008       0.159       0.164       0.181       
maxrss      168441      1640        166988      167492      171448      
minflt      35775       237         35464       35714       36180       
```

Nushell was over 2 times faster and used much more memory (~3x times more). 

# Results

## Performance

I suspect that nushell uses rust under the shell to make data aggregation quick, and raw nushell scripts are pretty slow.
That would expect why nushell crushed Deno in `1 million rows` but lost in `fibbonaci` test. This is fine, shell doesn't have
to be fast and I think it's great that Nushell is fast enough for scripts, but really quick for calculations on big data sets.

I expected Deno to win both tests (after all Nushell is much smaller project), but as I said probably I wasn't benchmarking 
Deno vs Nushell, but Deno vs some rust library that Nushell uses internally. I suspect that fibonacci test was benchmarking
both runtimes more 'fairly' (after all I could also use polars bindings or something else in Deno to achieve probably similar results).

Maybe it's possible to optimize my TS code (that's very likely in fact), but I wanted to go for the easiest approach since I've wanted
to test how both solutions will behave with idiomatic and easy to understand code.  

## Ergonomics

This is probably more important thing. Have a look into rows.nu and rows.ts files to see difference between both languages. Nushell was
more consise and after figuring out some quirks (like being forced to use `items` function) it turned out great. I hate that I've spent
over 10 minutes fighting against wrong bracket types, trying to return tuples etc. etc. but that was skill issue on my part. Probably
if I'd spend some time in the ecosystem those things would become muscle memory, but I'd prefer more familiar syntax, but maybe there are reasons
to not follow RS/TS more closely. 

Deno was just Typescript with it's strengths and weaknesses. Nushell functional approach with pipes was better for data manipulation, but
if something needs to be done imperatively I'd much rather use TS. 

# Summary

In the future I'll probably reach to use nushell whenever I'd need to inspect some big CSVs and manipulate them, but even when Nushell
get's their package management system I don't think I'd reach for it for imperative tasks. Here are some examples of tasks with my preferred choice:

- Data aggregation / manipulation - Nushell
- Simple automation (think about just running bunch of commands) - Nushell
- Long running automation (maybe something with CRON etc.) - Deno
- CLIs - Nushell (didn't touch on that, but nushell does that out of the box)
- Web Scraping - Deno
- Anything with more involved logic - Deno
- Anything that's solved problem in JS Land - Deno

All in all I don't think performance matters here, have a look at source code to see solutions in both languages and which ones looks better.
Ergonomics are more important in such use cases and I think that there's no winner in this category and I'll my tools depending on the job.

Cheers.
