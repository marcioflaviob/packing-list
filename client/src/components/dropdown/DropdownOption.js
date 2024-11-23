import React from "react";

const DropdownOption = ({ bag, onClick, colors }) => {
  return (
    <div
      className="BagSelector-dropdown"
      onClick={() => onClick(bag)}
      style={bag ? { backgroundColor: `#${colors[bag.color]}` } : {}}
    >
      <p className="_bagTitle">{bag && bag.title}</p>
    </div>
  );
};

export default DropdownOption;
