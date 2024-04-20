import React from 'react'
import { FaTrash } from "react-icons/fa";

const DeleteBag = ({ bags, bag_id, fetchBags, fetchItems }) => {

	const handleClick = async () => {
		if (bags.length === 1) {
			alert('You must have at least one bag');
			return;
		}
		await fetch(`http://localhost:8000/deleteBag/${bag_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		fetchBags();
		fetchItems();
	};

	return (
	  <div className='delete-icon' onClick={handleClick}>
		<FaTrash />
	  </div>
	)
  }
  
  export default DeleteBag