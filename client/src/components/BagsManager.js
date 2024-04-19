import React from 'react'
import ListBag from './ListBag'
import ColorPicker from './ColorPicker'

const BagsManager = ({ bags }) => {
	return (
	  <div className='list-bags'>
		<h1>Bags</h1>
			{bags.map((bag) => (
				<div className="bag-group">
				<ListBag key={bag.id} bag={bag} />
				<ColorPicker />
				</div>
			))}
	  </div>
	)
  }
  
  export default BagsManager