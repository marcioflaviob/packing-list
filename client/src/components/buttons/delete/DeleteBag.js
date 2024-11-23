import React, { useState, useRef, useEffect } from 'react'
import { FaTrash } from "react-icons/fa";
import '../../../styles/DeleteBag.css';
import { IoClose } from "react-icons/io5";

const DeleteBag = ({ bags, bag_id, fetchBags, fetchItems }) => {
	const modalRef = useRef();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleClickOutside = (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			setIsModalOpen(false);
		}
	}

	useEffect(() => {
		if (isModalOpen) {
		  document.addEventListener('mousedown', handleClickOutside);
		} else {
		  document.removeEventListener('mousedown', handleClickOutside);
		}
	
		return () => {
		  document.removeEventListener('mousedown', handleClickOutside);
		};
	  }, [isModalOpen]);

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
			<div className="modal" ref={modalRef}>
				<div className='close-modal-button' onClick={handleCancel}>
					<IoClose />
				</div>
				<div className="modal-content">
					<p>Deleting this bag will result in the deletion of all the items assigned to this bag</p>
					<button className='gray-button' onClick={handleCancel}>Cancel</button>
					<button className='delete-button' onClick={handleConfirm}>Delete</button>
				</div>
			</div>
		</div>
		)}
	</div>
	)
  }
  
  export default DeleteBag