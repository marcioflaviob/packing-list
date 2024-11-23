import React, { useState, useRef, useEffect } from 'react'
import Save from './Save';
import { IoClose } from "react-icons/io5";
import { RxQuestionMarkCircled } from "react-icons/rx";
import '../styles/SaveHeader.css';

const SaveHeader = ({ passphrase, setHasPin, hasPin }) => {
	const modalRef = useRef();
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const handleClick = () => {
		setIsModalOpen(true);
	}

	const handleCancel = () => {
		setIsModalOpen(false);
	}

	const handleNewList = () => {
		localStorage.removeItem('previousId');
		window.location.href = '/';
	}


	return (
	  <div className='SaveHeader'>
		{isModalOpen && (
		<div className="modal-overlay">
			<div className="modal" ref={modalRef}>
			<div className='close-modal-button' onClick={handleCancel}>
				<IoClose />
			</div>
			<div className='modal-content'>
				<p>Your list ID is a unique identifier that you can use to return to this list later.</p>
				<p className='modal-text'>www.mydomain.com/{passphrase}</p>
				<p>Simply add it to the URL to access your list.</p>
				<button className='gray-button' onClick={handleNewList}>Create a new list</button>
			</div>
			</div>
		</div>
		)}
		<div className='list-info'>
			<p>List id: {passphrase}</p>
			<div className='question-mark' onClick={handleClick}>
				<RxQuestionMarkCircled />
			</div>
		</div>
		{!hasPin && <Save passphrase={passphrase} setHasPin={setHasPin} />}
	  </div>
	);
};
  
  export default SaveHeader