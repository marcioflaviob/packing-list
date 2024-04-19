import React, { useState, useEffect } from 'react';
import ItemsManager from "./components/ItemsManager"
import BagsManager from './components/BagsManager';
import { useParams } from 'react-router-dom';

const App = () => {

  
  const [bags, setBags] = useState([]);
  const [items, setItems] = useState([]);

  const params = useParams();
  const [id, setId] = useState(params.id);
  
  useEffect(() => {

    const fetchId = async () => {
      const response = await fetch(`http://localhost:8000/getPassphrase`);
      const data = await response.text();
      setId(data);
    };
    
    const fetchBags = async () => {
      const response = await fetch(`http://localhost:8000/${id}/bags`);
      const data = await response.json();
      setBags(data);
    };

    if (!id) {
      fetchId();
    }
    fetchBags();
  }, [id]);

  return (
    <div className='app'>
      {id}
      <div className='component'>
        <ItemsManager passphrase={id} />
      </div>
      <div className='component'>
        <BagsManager bags={bags} />
      </div>
    </div>
  )
}

export default App
