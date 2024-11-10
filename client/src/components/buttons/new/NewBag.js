import React from 'react'

const NewBag = ({ passphrase, fetchBags }) => {

	const handleClick = async () => {
		await fetch(`http://localhost:8000/addBag/${passphrase}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		fetchBags();
	};

	return (
	  <div className='new-item' onClick={handleClick}>
		<p>Add new bag</p>
	  </div>
	)
  }
  
  export default NewBag