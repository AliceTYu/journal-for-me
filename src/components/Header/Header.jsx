import { useCallback, useState } from 'react';
import Button from '../Button/Button';
import SelectUser from '../SelectUser/SelectUser';
import Logo from '../Logo/Logo';

const logos=['Personal journal', 'Journal for me'];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);

	const toggleLogo = useCallback(() => {
		setLogoIndex(state => Number(!state));
	}, []);
	
	return (
		<>
			<Logo>{logos[logoIndex]}</Logo>
			<Button onClick={toggleLogo}>Сменить лого</Button>
			<SelectUser/>
		</>
	);
}

export default Header;