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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    localStorage.setItem('previousId', data);
    setId(data);
  }, []);
  
  const fetchAndInitialize = useCallback(async () => {
    if (!id) {
      if (localStorage.getItem('previousId')) {
        setId(localStorage.getItem('previousId'));
      } else {
        await fetchId();
      }
    } else if (!isAuthenticated) {
      const response = await fetch(`http://localhost:8000/hasPin/${id}`);
      if (response.status === 400) {
        if (localStorage.getItem('previousId') === id) {
          localStorage.removeItem('previousId');
        }
        window.location.href = '/';
      } else if (await response.json()) {
        setHasPin(true);
    } else {
      setIsAuthenticated(true);
      await fetchItems();
      await fetchBags();
    }
  }
  }, [id, isAuthenticated, fetchItems, fetchBags, fetchId]);
  
  
  useEffect(() => {
      fetchAndInitialize();
  }, [id, fetchAndInitialize]);

  useEffect(() => {
    fetchItems();
    fetchBags();
  }, [isAuthenticated, fetchBags, fetchItems]);

  useEffect(() => {
    console.log('isAuthenticated changed:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className='app' style={{zIndex: 0}}>
      {(hasPin && !isAuthenticated) && <InsertPin passphrase={id} setIsAuthenticated={setIsAuthenticated} />}
      {isAuthenticated && <SaveHeader passphrase={id} setHasPin={setHasPin} hasPin={hasPin} />}
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
