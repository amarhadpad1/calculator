import React from "react";
import Button from "./Button";


type Props = { onPress: (v: string) => void };


const layout: { label: string; variant?: "op" | "util" | "eq" | "num" }[] = [
{ label: "C", variant: "util" },
{ label: "DEL", variant: "util" },
{ label: "/", variant: "op" },
{ label: "*", variant: "op" },
{ label: "7" }, { label: "8" }, { label: "9" }, { label: "-", variant: "op" },
{ label: "4" }, { label: "5" }, { label: "6" }, { label: "+", variant: "op" },
{ label: "1" }, { label: "2" }, { label: "3" }, { label: "=", variant: "eq" },
{ label: "0" }, { label: "." }
];


export default function Keypad({ onPress }: Props) {
return (
<div className="keypad">
{layout.map((k) => (
<Button key={k.label} label={k.label} onClick={onPress} variant={k.variant} />
))}
</div>
);
}