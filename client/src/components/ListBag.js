import React, { useState } from 'react'

const ListBag = ({ bag, fetchBags, fetchItems, onFocus, onBlur }) => {
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
		  if (onBlur) {
			onBlur();
		  }
		};

		const handleInputFocus = () => {
			if (onFocus) {
			  onFocus();
			}
		  };

	return (
	  <div key={bag.id}>
		<input	type="text" 
				className="ItemTitle"
				value={title}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				onFocus={handleInputFocus}
				/>
	  </div>
	)
  }
  
  export default ListBag