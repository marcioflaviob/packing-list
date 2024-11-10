import React, { useEffect } from 'react'
import ListBag from './ListBag'
import ColorPicker from './dropdown/ColorPicker'
import DeleteBag from './buttons/delete/DeleteBag'
import ProgressBar from './ProgressBar'
import NewBag from './buttons/new/NewBag'

const BagsManager = ({ passphrase, bags, fetchItems, fetchBags }) => {

	
	useEffect(() => {
		fetchBags();
    }, [fetchBags]);

	return (
	  <div className='list-bags'>
		<h1>Bags</h1>
			{bags.map((bag) => (
				<div className="bag-group" key={bag.id}>
				<ColorPicker bag={bag} fetchItems={fetchItems} fetchBags={fetchBags} />
				<ListBag key={bag.id} bag={bag} fetchBags={fetchBags} fetchItems={fetchItems} />
				<DeleteBag bags={bags} bag_id={bag.id} fetchBags={fetchBags} fetchItems={fetchItems} />
				<ProgressBar bag={bag} bags={bags}/>
				</div>
			))}
		<NewBag passphrase={passphrase} fetchBags={fetchBags} />
	  </div>
	)
  }
  
  export default BagsManager