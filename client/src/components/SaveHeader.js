import React from 'react'
import Save from './Save';
import { RxQuestionMarkCircled } from "react-icons/rx";

const SaveHeader = ({ passphrase }) => {
	return (
	  <div className='SaveHeader'>
		<p>List id: {passphrase}</p>
		<RxQuestionMarkCircled />
		<Save passphrase={passphrase} />
	  </div>
	);
};
  
  export default SaveHeader