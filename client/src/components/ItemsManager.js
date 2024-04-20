import React, { useState, useEffect, useContext } from 'react'
import ListItem from './ListItem'
import BagSelector from './BagSelector'
import NewItem from './NewItem'
import DeleteItem from './DeleteItem'

const ItemsManager = ({ passphrase, items, bags, fetchBags, fetchItems }) => {

	// const [isLoading, setIsLoading] = useState(true);

	const handleCheck = async (item_id) => {
		await fetch(`http://localhost:8000/changeChecker/${item_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		fetchItems();
	};

	useEffect(() => {
        // const fetchData = async () => {
		// 	await fetchItems();
		// 	setIsLoading(false);
		// };
		// fetchData();
		fetchItems();
    }, []);
	

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	return (
	  <div className="list-header">
		<h1>Items</h1>
		<div>
			{items.map((item) => (
				<div className='item-group' key={item.id}>
					<BagSelector 
						passphrase={passphrase}
						bags={bags}
						fetchBags={fetchBags}
						fetchItems={fetchItems}
						item={item}
						/>
					<ListItem item={item} />
					<input
						className='ItemCheckbox'
						type='checkbox' 
						checked={item.is_checked}
						onClick={() => handleCheck(item.id)}>
					</input>
					<DeleteItem items={items} item_id={item.id} fetchItems={fetchItems} />
				</div>
			))}
			<NewItem bag_id={items[0] ? items[0].bag_id : null} fetchItems={fetchItems} />
		</div>
	  </div>
	)
  }
  
  export default ItemsManager