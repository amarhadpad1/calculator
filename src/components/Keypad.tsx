import React from "react";

interface KeypadProps {
  onPress: (key: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onPress }) => {
  const buttons = [
    ["C", "DEL", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div className="keypad">
      {buttons.flat().map((btn, i) => (
        <button
          key={i}
          className={`btn 
            ${btn === "=" ? "eq" : ""} 
            ${["/", "*", "-", "+", "%"].includes(btn) ? "op" : ""} 
            ${["C", "DEL"].includes(btn) ? "util" : ""}`}
          onClick={() => onPress(btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default Keypad;
