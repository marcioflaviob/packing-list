import React, { useState, useEffect } from 'react';
import ItemsManager from "./components/ItemsManager"
import BagsManager from './components/BagsManager';
import { useParams } from 'react-router-dom';

const App = () => {

  const params = useParams();
  const [items, setItems] = useState([]);
  const [bags, setBags] = useState([]);
  const [id, setId] = useState(params.id);

  const fetchItems = async () => {
    const response = await fetch(`http://localhost:8000/${id}/items`);
    const data = await response.json();
    setItems(data);
  }


	const fetchBags = async () => {
		const response = await fetch(`http://localhost:8000/${id}/bags`);
		const data = await response.json();
		setBags(data);
	}
  
  useEffect(() => {

    const fetchId = async () => {
      const response = await fetch(`http://localhost:8000/getPassphrase`);
      const data = await response.text();
      setId(data);
    };

    if (!id) {
      fetchId();
    }
  }, [id]);

  return (
    <div className='app'>
      {/* {id} */}
      <div className='component'>
        <ItemsManager passphrase={id} items={items} bags={bags} fetchBags={fetchBags} fetchItems={fetchItems} />
      </div>
      <div className='component'>
        <BagsManager passphrase={id} bags={bags} fetchItems={fetchItems} fetchBags={fetchBags} />
      </div>
    </div>
  )
}

export default App
