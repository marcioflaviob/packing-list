import React, { useState, useEffect } from 'react'
import ListBag from './ListBag'
import ColorPicker from './ColorPicker'
import DeleteBag from './DeleteBag'
import NewBag from './NewBag'

const BagsManager = ({ passphrase, bags, fetchItems, fetchBags }) => {

	useEffect(() => {
        fetchBags();
    }, []);

	return (
	  <div className='list-bags'>
		<h1>Bags</h1>
			{bags.map((bag) => (
				<div className="bag-group">
				<ListBag key={bag.id} bag={bag} />
				<ColorPicker bag={bag} fetchBags={fetchBags} fetchItems={fetchItems} fetchBags={fetchBags} />
				<DeleteBag bags={bags} bag_id={bag.id} fetchBags={fetchBags} fetchItems={fetchItems} />
				</div>
			))}
		<NewBag passphrase={passphrase} fetchBags={fetchBags} />
	  </div>
	)
  }
  
  export default BagsManager