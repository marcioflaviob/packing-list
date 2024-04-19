import React, { useState, useEffect } from "react";
import DropdownOption from "./DropdownOption";

const BagDropdown = ({ passphrase, onBagSelected }) => {

	const [ bags, setBags ] = useState([]);

	const fetchBags = async () => {
		const response = await fetch(`http://localhost:8000/${passphrase}/bags`);
		const data = await response.json();
		setBags(data);
	}

	useEffect(() => {
		fetchBags();
    }, []);


	return (
	  <div className="bag-dropdown">
		{bags.map((bag) => (
			<DropdownOption
			bag={bag}
			onClick={() => onBagSelected(bag)} />
		))}
	  </div>
	);
  };
  
  export default BagDropdown