import React from "react";


type Props = { value: string };


export default function Display({ value }: Props) {
return <div className="display" role="status" aria-live="polite">{value}</div>;
}