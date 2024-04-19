import React from 'react'

const DropdownOption = ({ bag, onClick }) => {
	console.log(bag);
	return (
	<div className="BagSelector" onClick={() => onClick(bag)}>
		<p className="_bagTitle">{bag && bag.title}</p>
	</div>
	)
  }
  
  export default DropdownOption