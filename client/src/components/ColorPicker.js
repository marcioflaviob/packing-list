import React, { useState } from 'react'
import { CgColorPicker } from "react-icons/cg";

const ColorPicker = ({ bag, fetchItems, fetchBags }) => {

	const colors = ["4793AF", "FFC470", "DD5746", "8B322C", "D9EDBF", "FF9800", "2C7865", "90D26D"];
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState(colors[bag.color]);

	const handleClick = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleColorSelect = async (index) => {
		await fetch(`http://localhost:8000/changeColor/${bag.id}/${index}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		fetchItems();
		fetchBags();
		setDropdownOpen(!dropdownOpen);
	};

	console.log(bag);

	return (
		<div>
			<div>
					<div
						className='color-option'
						onClick={handleClick}
						style={{ backgroundColor: bag ? `#${colors[bag.color]}` : '#000000' }}>
						<CgColorPicker />
					</div>
				{dropdownOpen &&
					<div className='dropdown-bag-wrapper'>
						{colors.map((color, index) => (
							<div
								className='dot'
								key={index}
								className={`color-option ${selectedColor === color ? 'selected' : ''}`}
								style={{ backgroundColor: `#${color}` }}
								onClick={() => handleColorSelect(index)}
							/>
						))}
					</div>
				}
			</div>
		</div>
	)};
  
	export default ColorPicker