import React, { useEffect, useRef } from 'react'
import ListBag from './ListBag'
import ColorPicker from './dropdown/ColorPicker'
import DeleteBag from './buttons/delete/DeleteBag'
import ProgressBar from './ProgressBar'
import NewBag from './buttons/new/NewBag'

const BagsManager = ({ passphrase, bags, fetchItems, fetchBags }) => {

	const itemRefs = useRef([]);

	useEffect(() => {
		fetchBags();
    }, [fetchBags]);

	const handleFocus = (index) => {
		if (itemRefs.current[index]) {
		  itemRefs.current[index].classList.add('focused');
		}
	  };
	
	  const handleBlur = (index) => {
		if (itemRefs.current[index]) {
		  itemRefs.current[index].classList.remove('focused');
		}
	  };

	return (
	  <div className='list-bags'>
		<h1>Bags</h1>
			{bags.map((bag, index) => (
				<div className="item-group" key={bag.id} ref={(el) => (itemRefs.current[index] = el)}>
					<ColorPicker bag={bag} fetchItems={fetchItems} fetchBags={fetchBags} />
					<ListBag key={bag.id} bag={bag} fetchBags={fetchBags} fetchItems={fetchItems} 
					onFocus={() => handleFocus(index)} 
					onBlur={() => handleBlur(index)} />
					<ProgressBar bag={bag} bags={bags}/>
					<DeleteBag bags={bags} bag_id={bag.id} fetchBags={fetchBags} fetchItems={fetchItems} />
				</div>
			))}
		<NewBag passphrase={passphrase} fetchBags={fetchBags} />
	  </div>
	)
  }
  
  export default BagsManager