import React, { useState, useRef } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import '../styles/InsertPin.css'; // Assuming you will create a CSS file for styling

const InsertPin = ({ passphrase, setIsAuthenticated }) => {
  const [pin, setPin] = useState('');
  const pinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSubmit = () => {
    setPin(pinRefs.map((ref) => ref.current.value).join(''));
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
          localStorage.setItem('previousId', passphrase);
        } else {
          const alertElement = document.querySelector('.modal-alert');
          alertElement.textContent = 'Invalid PIN';
          alertElement.style.display = 'block';
          setTimeout(() => {
            alertElement.style.display = 'none';
          }, 5000);
        }
      });
  };

	const handlePinChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < 3) {
        pinRefs[index + 1].current.focus();
    } else if (value.length === 0 && index > 0) {
        pinRefs[index - 1].current.focus();
    }
};

  const handleReturn = () => {
    if (localStorage.getItem('previousId') === passphrase) {
      localStorage.removeItem('previousId');
    }
    // Redirect to the home page
    window.location.href = '/';
  };

  return (
    <div className='insert-pin-overlay'>
      <div className='return-button-div'>
        <button className='button-return' onClick={handleReturn}>
          <FaArrowLeft />
          <p>Return</p>
        </button>
      </div>
      <div className='insert-pin-modal'>
        <h1>This list is locked</h1>
        <p>Enter your PIN</p>
        <p className='modal-alert'></p>
        <div>
          {pinRefs.map((ref, index) => (
            <input
              key={index}
              type='password'
              maxLength='1'
              ref={ref}
              onChange={(e) => handlePinChange(e, index)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && e.target.value === '') {
                  if (index > 0) {
                    pinRefs[index - 1].current.focus();
                  }
                }
              }}
            />
          ))}
        </div>
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default InsertPin;