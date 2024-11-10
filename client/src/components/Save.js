import React, { useState, useEffect, useRef } from 'react'

const Save = ({ passphrase }) => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const pinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
	const modalRef = useRef(null);

	const handleClickOutside = async (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			setIsModalOpen(false);
		}
	}

	useEffect(() => {
		if (isModalOpen) {
		  document.addEventListener('mousedown', handleClickOutside);
		} else {
		  document.removeEventListener('mousedown', handleClickOutside);
		}
	
		return () => {
		  document.removeEventListener('mousedown', handleClickOutside);
		};
	  }, [isModalOpen]);

	const handleClick = async () => {
		setIsModalOpen(true);
	};

	const handlePinChange = (e, index) => {
		if (e.target.value.length === 1 && index < 3) {
		  pinRefs[index + 1].current.focus();
		}
	};

	const handleSave = async () => {
		const pin = pinRefs.map((ref) => ref.current.value).join('');
		console.log('we are here and the passphrase is');
		console.log(passphrase);
		const response = await fetch('http://localhost:8000/addPin', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ passphrase, pin }),
		});
		if (response.status === 200) {
			alert('List saved');
		} else {
			alert('Error saving list');
		}
		setIsModalOpen(false);

	};

	return (
	  <div className='new-item' onClick={handleClick}>
		<p>Save list</p>
		{isModalOpen && (
		<div className="modal-overlay">
			<div className="modal" ref={modalRef}>
			<p>Please choose a PIN to lock your list</p>
			<div>
              {pinRefs.map((ref, index) => (
                <input
                  key={index}
                  type='password'
                  maxLength='1'
                  ref={ref}
                  onChange={(e) => handlePinChange(e, index)}
                />
              ))}
            </div>
			<button onClick={handleSave}>Save</button>
			</div>
		</div>
		)}
	  </div>
	)
  }
  
  export default Save