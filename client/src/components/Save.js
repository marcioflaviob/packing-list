import React, { useState, useEffect, useRef } from 'react'
import { IoClose } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import '../styles/Save.css';

const Save = ({ passphrase, setHasPin }) => {

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

	const handleCancel = async () => {
		setIsModalOpen(false);
	};

    const handlePinChange = (e, index) => {
        const { value } = e.target;
        if (/^\d*$/.test(value)) { // Only allow numeric values
            if (value.length === 1 && index < 3) {
                pinRefs[index + 1].current.focus();
            } else if (value.length === 0 && index > 0) {
                pinRefs[index - 1].current.focus();
            }
        } else {
            e.target.value = '';
			const alertElement = document.querySelector('.modal-alert');
			alertElement.textContent = 'Only numbers are allowed';
			alertElement.style.display = 'block';
			setTimeout(() => {
				alertElement.style.display = 'none';
			}, 5000);
        }
    };

	const handleSave = async () => {
		if (pinRefs.some((ref) => ref.current.value === '')) {
			//Alert user to fill in all fields
			const alertElement = document.querySelector('.modal-alert');
            alertElement.textContent = 'Please fill in all fields';
            alertElement.style.display = 'block';

			setTimeout(() => {
				alertElement.style.display = 'none';
			}, 5000);

			return;
		}
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
			const alertElement = document.querySelector('.modal-alert');
			alertElement.textContent = 'List saved';
			alertElement.style.display = 'block';
			alertElement.style.color = 'green';
			setTimeout(() => {
				alertElement.style.display = 'none';
				setIsModalOpen(false);
				setHasPin(true);
			}, 4000);
			return;
		} else {
			alert('Error saving list');
		}
		setIsModalOpen(false);

	};

	return (
			<div>

	  <div className='lock-button' onClick={handleClick}>
		<p>Save list</p>
			<IoLockClosed />
		</div>
		{isModalOpen && (
			<div className="modal-overlay">
			<div className="modal-save" ref={modalRef}>
			<div className='close-modal-button' onClick={handleCancel}>
				<IoClose />
			</div>
			<div className='modal-content'>
				<p>Enter a PIN to lock your list</p>
				<p className='modal-alert'></p>
				<div className='fields'>
					{pinRefs.map((ref, index) => (
						<input
						key={index}
						type='password'
						maxLength='1'
						inputMode='numeric'
						pattern='[0-9]*'
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
				<button className='gray-button' onClick={handleSave}>Save</button>
			</div>
			</div>
		</div>
		)}
	  </div>
	)
  }
  
  export default Save