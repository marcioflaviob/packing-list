import React, { useEffect, useState, useCallback } from 'react'

const ProgressBar = ({ bag, bags }) => {

	const [bag_items, setBagItems] = useState([]);
	const [progress, setProgress] = useState(0);
	const colors = ["4793AF", "FFC470", "DD5746", "8B322C", "D9EDBF", "FF9800", "2C7865", "90D26D"];

	
    const fetch_items = useCallback(async () => {
        const response = await fetch(`http://localhost:8000/getItemsFromBag/${bag.id}`);
        const data = await response.json();
        setBagItems(data);
    }, [bag.id]);

	useEffect(() => {
        fetch_items();
    }, [fetch_items, bags]);

	useEffect(() => {
		const checkedItems = bag_items.filter(item => item.is_checked).length;
		console.log("checkedItems");
		console.log(checkedItems);
		const totalItems = bag_items.length;
		setProgress(totalItems > 0 ? (checkedItems / totalItems) * 100 : 0);
	}, [bag_items]);

	return (
		<div className="progress-bar">
		  <div className="progress-filler" style={{ width: `${progress}%`, backgroundColor: `#${colors[bag.color]}` }}>
			<span className="progress-label">{`${Math.floor(progress)}%`}</span>
		  </div>
		</div>
	  );
  }
  
  export default ProgressBar