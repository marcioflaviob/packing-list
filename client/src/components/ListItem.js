import React, { useState } from 'react'

const ListItem = ({ item, onFocus, onBlur }) => {
	const [title, setTitle] = useState(item.title || '');

	const handleInputChange = (event) => {
	  setTitle(event.target.value);
	};

	const handleInputBlur = async () => {
		await fetch(`http://localhost:8000/changeItemTitle/${item.id}/${title}`, {
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json'
		  },
		});
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
	  <div className='ListItem' key={item.id}>
		<input 
			className='ItemTitle'
			type='text'
			value={title}
			onChange={handleInputChange}
			onBlur={handleInputBlur}
			onFocus={handleInputFocus}
			/>
	  </div>
	)
  }
  
  export default ListItem