import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";

type Token = number | string;

const precedence: Record<string, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let num = "";
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if ((ch >= "0" && ch <= "9") || ch === ".") {
      num += ch;
    } else if ("+-*/".includes(ch)) {
      if (num) {
        tokens.push(parseFloat(num));
        num = "";
      }
      tokens.push(ch);
    } else if (ch === " ") {
      continue;
    }
  }
  if (num) tokens.push(parseFloat(num));
  return tokens;
}

function toRPN(tokens: Token[]): Token[] {
  const out: Token[] = [];
  const ops: string[] = [];

  for (const t of tokens) {
    if (typeof t === "number") {
      out.push(t);
    } else {
      const op = t as string;
      while (ops.length > 0) {
        const lastOp = ops[ops.length - 1];
        if ((precedence[lastOp] ?? 0) >= (precedence[op] ?? 0)) {
          out.push(ops.pop()!);
        } else {
          break;
        }
      }
      ops.push(op);
    }
  }

  while (ops.length > 0) {
    out.push(ops.pop()!);
  }

  return out;
}

function evalRPN(rpn: Token[]): number {
  const stack: number[] = [];
  for (const t of rpn) {
    if (typeof t === "number") {
      stack.push(t);
    } else {
      const op = t as string;
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) throw new Error("Bad expression");
      switch (op) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(b === 0 ? NaN : a / b);
          break;
        default:
          throw new Error("Unknown operator");
      }
    }
  }
  if (stack.length !== 1) throw new Error("Bad expression");
  return stack[0];
}

export default function App() {
  const [expr, setExpr] = useState("");

  const append = (val: string) =>
    setExpr((e) => (e === "Error" ? val : e + val));

  const onKey = (key: string) => {
    switch (key) {
      case "C":
        setExpr("");
        break;
      case "DEL":
        setExpr((e) => (e === "Error" ? "" : e.slice(0, -1)));
        break;
      case "=":
        try {
          const tokens = tokenize(expr);
          const rpn = toRPN(tokens);
          const val = evalRPN(rpn);
          if (!isFinite(val)) throw new Error("Math error");
          setExpr(String(val));
        } catch {
          setExpr("Error");
        }
        break;
      default:
        append(key);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key >= "0" && e.key <= "9") || "+-*/.".includes(e.key)) {
        onKey(e.key);
      } else if (e.key === "Enter") {
        onKey("=");
      } else if (e.key === "Backspace") {
        onKey("DEL");
      } else if (e.key.toLowerCase() === "c") {
        onKey("C");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [expr]);

  return (
    <div className="app">
      <div className="calc">
        <Display value={expr || "0"} />
        <Keypad onPress={onKey} />
      </div>
    </div>
  );
}
