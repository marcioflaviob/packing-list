import React, { useState } from 'react';
import '../styles/InsertPin.css'; // Assuming you will create a CSS file for styling

const InsertPin = ({ passphrase, setIsAuthenticated }) => {
  const [pin, setPin] = useState('');

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = () => {
    fetch('http://localhost:8000/checkPin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ passphrase, pin }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsAuthenticated(true);
        } else {
          alert('Incorrect PIN');
        }
      });
  };

  return (
    <div className='insert-pin-overlay'>
      <div className='insert-pin-modal'>
        <p>Please enter your PIN</p>
        <input
          type='password'
          value={pin}
          onChange={handlePinChange}
          maxLength='4'
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default InsertPin;