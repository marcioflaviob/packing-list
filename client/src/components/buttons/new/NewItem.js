import React from 'react'

const NewItem = ({ bag_id, fetchItems }) => {

	const handleClick = async () => {
		await fetch(`http://localhost:8000/addItem/${bag_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		fetchItems();
	};

	return (
	  <div className='new-item' onClick={handleClick}>
		<p>Add new item</p>
	  </div>
	)
  }
  
  export default NewItem