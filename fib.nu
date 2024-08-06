#!/usr/bin/env nu

def fib [n: int] {
    if $n == 0 {
        return 1
    } else if $n == 1 {
        return 1
    }

    (fib ($n - 1)) + (fib ($n - 2))
}

fib 25
