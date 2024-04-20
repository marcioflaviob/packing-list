import React, { useState } from 'react'

const ListBag = ({ bag }) => {
	const [title, setTitle] = useState(bag.title);

	const handleInputChange = (event) => {
		setTitle(event.target.value);
	  };
  
	  const handleInputBlur = async () => {
		  await fetch(`http://localhost:8000/changeBagTitle/${bag.id}/${title}`, {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json'
			},
		  });
		};

	return (
	  <div key={bag.id}>
		<input	type="text" 
				className="BagTitle"
				value={title}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				/>
	  </div>
	)
  }
  
  export default ListBag