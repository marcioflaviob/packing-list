import React, { useState } from 'react'

const ListBag = ({ bag, fetchBags, fetchItems }) => {
	const [title, setTitle] = useState(bag.title);

	const handleInputChange = (event) => {
		setTitle(event.target.value);
		handleInputBlur();
	  };
  
	  const handleInputBlur = async () => {
		  await fetch(`http://localhost:8000/changeBagTitle/${bag.id}/${title}`, {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json'
			},
		  });
		  fetchItems();
		  fetchBags();
		};

	return (
	  <div key={bag.id}>
		<input	type="text" 
				className="ItemTitle"
				value={title}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				/>
	  </div>
	)
  }
  
  export default ListBag