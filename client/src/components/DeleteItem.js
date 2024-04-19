import React from 'react'

const DeleteItem = ({ item_id, fetchItems }) => {

	const handleClick = async () => {
		await fetch(`http://localhost:8000/deleteItem/${item_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		fetchItems();
	};

	return (
	  <div className='delete-item' onClick={handleClick}>
		<p>X</p>
	  </div>
	)
  }
  
  export default DeleteItem