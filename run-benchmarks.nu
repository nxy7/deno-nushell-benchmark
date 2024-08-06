#!/usr/bin/env nu


multitime -n 5 -f rusage ./rows.nu err> rows-nu-result.txt; 
multitime -n 5 -f rusage ./rows.ts err> rows-ts-result.txt; 
multitime -n 5 -f rusage ./fib.nu err> fib-nu-result.txt;
multitime  -n 5 -f rusage ./fib.ts err> fib-ts-result.txt;