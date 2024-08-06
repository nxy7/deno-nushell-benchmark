#!/usr/bin/env -S deno run -A

function fib(n: number): number {
  if (n == 0 || n == 1) return 1;

  return fib(n - 1) + fib(n - 2);
}

console.log(fib(25));
