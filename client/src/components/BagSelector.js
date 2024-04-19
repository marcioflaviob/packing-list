import React, { useState, useEffect } from "react"

const BagSelector = ({ passphrase, bag_id, clickFunction, item }) => {

	const [bag, setBag] = useState(null);
	// const [bags, setBags] = useState([]);
	// const [selectedBag, setSelectedBag] = useState(null);

	useEffect(() => {

		const fetchBag = async () => {
			const response = await fetch(`http://localhost:8000/getBagFromId/${bag_id}`);
			const data = await response.json();
			setBag(data[0]);
		}
		
		// const fetchBags = async () => {
		// 	const response = await fetch(`http://localhost:8000/${passphrase}/bags`);
		// 	const data = await response.json();
		// 	setBags(data);
		// 	setSelectedBag(bag_id);
		// };
		fetchBag();
	  }, [passphrase, bag_id]);

	return (
	  <div className="BagSelector" onClick={() => clickFunction(item)}>
		<p className="_bagTitle">{bag && bag.title}</p>
		<span className="ArrowDown">▼</span>
	  </div>
	)
  }
  
  export default BagSelector