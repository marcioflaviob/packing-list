import React, { useState, useEffect } from "react";
import DropdownOption from "./DropdownOption";

const BagSelector = ({ passphrase, item, bags, fetchBags, fetchItems }) => {
  const [bag, setBag] = useState(null);
  const colors = [
    "4793AF",
    "FFC470",
    "DD5746",
    "8B322C",
    "D9EDBF",
    "FF9800",
    "2C7865",
    "90D26D",
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = async () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onBagSelected = async (selected_bag) => {
    await fetch(
      `http://localhost:8000/changeBag/${item.id}/${selected_bag.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    fetchItems();
    fetchBags();
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    fetchBags();
  }, []);

  useEffect(() => {
    const foundBag = bags.find((b) => b.id === item.bag_id);
    setBag(foundBag);
  }, [bags, item]);

  return (
    <div className="outer-div">
      <div
        className="BagSelector"
        onClick={handleDropdown}
        style={bag ? { backgroundColor: `#${colors[bag.color]}` } : {}}
      >
        <p className="_bagTitle">{bag && bag.title}</p>
        <span className="ArrowDown">▼</span>
      </div>
      {dropdownOpen && (
        <div className="dropdown-wrapper">
          {bags.map((selected_bag) => (
            <DropdownOption
              bag={selected_bag}
              onClick={() => onBagSelected(selected_bag)}
			  colors={colors}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BagSelector;
