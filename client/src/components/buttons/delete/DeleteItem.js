import React from 'react'
import { FaTrash } from "react-icons/fa";

const DeleteItem = ({ items, item_id, fetchItems, fetchBags }) => {

	const handleClick = async () => {
		if (items.length === 1) {
			alert('You must have at least one item');
			return;
		}
		await fetch(`http://localhost:8000/deleteItem/${item_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		fetchItems();
		fetchBags();
	};

	return (
	  <div className='delete-icon' onClick={handleClick}>
		<FaTrash />
	  </div>
	)
  }
  
  export default DeleteItem