import React, { useState, useEffect } from "react";
import DropdownOption from "./dropdown/DropdownOption";

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

  const handleDropdown = async (e) => {
    e.stopPropagation();
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
  }, [fetchBags]);

  useEffect(() => {
    const foundBag = bags.find((b) => b.id === item.bag_id);
    setBag(foundBag);
  }, [bags, item]);

  useEffect(() => { // useEffect to add event listener to close dropdown when clicking outside
    const handleDocumentClick = () => {
        setDropdownOpen(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
        document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleDropdownClick = (e) => {
      e.stopPropagation();
  };

  return (
    <div className="outer-div" onClick={handleDropdownClick}>
      <div
        className="BagSelector"
        onClick={handleDropdown}
        style={bag ? { backgroundColor: `#${colors[bag.color]}` } : {}}
      >
        <p className="_bagTitle">{bag && bag.title}</p>
        <span className="ArrowDown">▼</span>
      </div>
      {dropdownOpen && (
        // This div should be a container for the dropdown options
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
