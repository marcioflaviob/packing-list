import React from 'react'

const ListBag = ({ bag }) => {
	return (
	  <div key={bag.id}>
		<input	type="text" 
				className="BagTitle"
				value={bag.title}></input>
	  </div>
	)
  }
  
  export default ListBag