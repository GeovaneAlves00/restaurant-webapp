import React from "react";

export function Select({ value, onValueChange, children }) {
  return (
    <select
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { selected: child.props.value === value })
      )}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
