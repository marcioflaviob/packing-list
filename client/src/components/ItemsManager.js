import React, { useState, useEffect } from 'react'
import ListItem from './ListItem'
import BagSelector from './BagSelector'
import BagDropdown from './dropdown/BagDropdown'
import NewItem from './NewItem'
import DeleteItem from './DeleteItem'

const ItemsManager = ({ passphrase }) => {

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [items, setItems] = useState([]);

	const handleCheck = async (item_id) => {
		await fetch(`http://localhost:8000/changeChecker/${item_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		fetchItems();
	};

	const fetchItems = async () => {
        const response = await fetch(`http://localhost:8000/${passphrase}/items`);
        const data = await response.json();
    	setItems(data);
		console.log(data);
    }

    const onBagSelected = async (bag) => {
		if (!bag) {
			bag = { id: -1 };
		}
        if (selectedItem) {
            await fetch(`http://localhost:8000/changeBag/${selectedItem.id}/${bag.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
			fetchItems();
			setDropdownOpen(!dropdownOpen);
        }
    };

	const handleDropdown = async (item) => {
		setDropdownOpen(!dropdownOpen);
		setSelectedItem(item);
	};

	useEffect(() => {
        fetchItems();
    }, []);

	return (
	  <div className="list-header">
		<h1>Items</h1>
		<div>
			{items.map((item) => (
				<div className='item-group' key={item.id}>
					<BagSelector 
						passphrase={passphrase}
						bag_id={item.bag_id}
						item={item}
						clickFunction={handleDropdown}
						/>
					<ListItem item={item} />
					<input
						className='ItemCheckbox'
						type='checkbox' 
						checked={item.is_checked}
						onClick={() => handleCheck(item.id)}>
					</input>
					<DeleteItem item_id={item.id} fetchItems={fetchItems} />
				</div>
			))}
			<NewItem bag_id={items[0] ? items[0].bag_id : null} fetchItems={fetchItems} />
			{dropdownOpen &&
				<div className='dropdown-wrapper'>
				<BagDropdown
					passphrase={passphrase}
					onBagSelected={onBagSelected}
				/>
				</div>}
		</div>
	  </div>
	)
  }
  
  export default ItemsManager