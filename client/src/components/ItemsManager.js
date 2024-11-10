import React, { useEffect } from 'react'
import ListItem from './ListItem'
import BagSelector from './BagSelector'
import NewItem from './buttons/new/NewItem'
import DeleteItem from './buttons/delete/DeleteItem'

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
		fetchBags();
	};

	useEffect(() => {
        // const fetchData = async () => {
		// 	await fetchItems();
		// 	setIsLoading(false);
		// };
		// fetchData();
		fetchItems();
    }, [fetchItems]);
	

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	return (
	  <div className="list-header">
		<h1>Items</h1>
		<div>
			{items.map((item) => (
				<div className='item-group' key={item.id}>
					<input
						className='ItemCheckbox'
						type='checkbox' 
						checked={item.is_checked}
						onChange={() => handleCheck(item.id)}>
					</input>
					<ListItem item={item} />
					<BagSelector passphrase={passphrase} bags={bags} fetchBags={fetchBags}
						fetchItems={fetchItems} item={item} />
					<DeleteItem items={items} item_id={item.id} fetchItems={fetchItems} fetchBags={fetchBags} />
				</div>
			))}
			<NewItem bag_id={items[0] ? items[0].bag_id : null} fetchItems={fetchItems} />
		</div>
	  </div>
	)
  }
  
  export default ItemsManager