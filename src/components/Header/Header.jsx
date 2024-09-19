import { useState } from 'react';
import Button from '../Button/Button';
import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css';
import TextEx from '../TextEx/TextEx';

const logos = ['не тык', 'тык'];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);
	const [secondIndex, setSecondIndex] = useState(0);

	console.log('header');

	const logoToggl = () => {
		setLogoIndex(state => Number(!state));
		setSecondIndex(i => i + 1);
		console.log(secondIndex);		
	};
	
	return (
		<>
			<img className={styles.logo} src='./public/header.svg' alt="logo" />
			<TextEx text={logos[logoIndex]}/>
			<Button onClick={logoToggl}>тык</Button>
			<SelectUser/>
		</>
	);
}

export default Header;