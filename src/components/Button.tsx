import React from "react";

type Props = {
  label: string;
  onClick: (v: string) => void;
  variant?: "op" | "util" | "eq" | "num";
};

export default function Button({ label, onClick, variant = "num" }: Props) {
  return (
    <button
      className={`btn ${variant}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}
