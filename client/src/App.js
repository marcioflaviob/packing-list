import React, { useState, useEffect, useCallback } from 'react';
import ItemsManager from "./components/ItemsManager"
import BagsManager from './components/BagsManager';
import { useParams } from 'react-router-dom';
import SaveHeader from './components/SaveHeader';
import InsertPin from './components/InsertPin';

const App = () => {

  const params = useParams();
  const [items, setItems] = useState([]);
  const [bags, setBags] = useState([]);
  const [id, setId] = useState(params.id || '');
  const [hasPin, setHasPin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(hasPin ? false : true);

  // const fetchItems = async () => {
  //   if (id) {
  //     const response = await fetch(`http://localhost:8000/${id}/items`);
  //     const data = await response.json();
  //     setItems(data);
  //   }
  // }


	// const fetchBags = async () => {
  //   if (id) {
  //     const response = await fetch(`http://localhost:8000/${id}/bags`);
  //     const data = await response.json();
  //     setBags(data);
  //   }
	// }

  const fetchItems = useCallback(async () => {
    if (id) {
      const response = await fetch(`http://localhost:8000/${id}/items`);
      const data = await response.json();
      setItems(data);
    }
  }, [id]);

  const fetchBags = useCallback(async () => {
    if (id) {
      const response = await fetch(`http://localhost:8000/${id}/bags`);
      const data = await response.json();
      setBags(data);
    }
  }, [id]);

  const initialize = async (newId) => {
    await fetch(`http://localhost:8000/init/${newId}`, {
      method: 'POST',
    });
  };
  
  const fetchId = useCallback(async () => {
    const response = await fetch(`http://localhost:8000/getPassphrase`);
    const data = await response.text();
    await initialize(data);
    setId(data);
  }, []);
  
  const fetchAndInitialize = useCallback(async () => {
    if (!id) {
      await fetchId();
    } else if (!isAuthenticated && await fetch(`http://localhost:8000/hasPin/${id}`).then(res => res.json())) {
        setHasPin(true);
    } else {
        await fetchItems();
        await fetchBags();
    }
  }, [id, isAuthenticated, fetchItems, fetchBags, fetchId]);
  
  
  useEffect(() => {
      fetchAndInitialize();
  }, [id, fetchAndInitialize]);

  useEffect(() => {
    fetchItems();
    fetchBags();
  }, [isAuthenticated, fetchBags, fetchItems]);

  return (
    <div className='app' style={{zIndex: 0}}>
      {hasPin && <InsertPin passphrase={id} setIsAuthenticated={setIsAuthenticated} />}
      {isAuthenticated && <SaveHeader passphrase={id} />}
      {isAuthenticated && <div className='bottom-components'>
        <div className='component'>
          <ItemsManager passphrase={id} items={items} bags={bags} fetchBags={fetchBags} fetchItems={fetchItems} />
        </div>
        <div className='component'>
          <BagsManager passphrase={id} bags={bags} fetchItems={fetchItems} fetchBags={fetchBags} />
        </div>
      </div>}
    </div>
  )
}

export default App
