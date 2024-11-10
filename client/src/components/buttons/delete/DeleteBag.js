import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa";

const DeleteBag = ({ bags, bag_id, fetchBags, fetchItems }) => {

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleDeleteClick = () => {
		setIsModalOpen(true);
	};

	const handleConfirm = async () => {
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
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	}

	return (
	<div>
	  <div className='delete-icon' onClick={handleDeleteClick}>
		<FaTrash />
	  </div>
		{isModalOpen && (
		<div className="modal-overlay">
			<div className="modal">
			<p>Deleting this bag will result in the deletion of all the items assigned to this bag</p>
			<button onClick={handleConfirm}>Delete</button>
			<button onClick={handleCancel}>Cancel</button>
			</div>
		</div>
		)}
	</div>
	)
  }
  
  export default DeleteBag