import { useCallback, useState } from 'react';
import Button from '../Button/Button';
import SelectUser from '../SelectUser/SelectUser';
import Logo from '../Logo/Logo';

const logos=['Personal journal', 'Чтобы работало: добавьте в Application (localStorage) переменную data со значением [] <- скобки )'];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);

	const toggleLogo = useCallback(() => {
		setLogoIndex(state => Number(!state));
	}, []);
	
	return (
		<>
			<Logo logoIndex={logoIndex}>{logos[logoIndex]}</Logo>
			<Button onClick={toggleLogo}>Инфо</Button>
			<SelectUser/>
		</>
	);
}

export default Header;