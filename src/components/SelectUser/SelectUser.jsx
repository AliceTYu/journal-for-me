import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from './SelectUser.module.css';

function SelectUser() {    
	const { userId, setUserId } = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};
	
	return (
		<select className={styles.select} value={userId} name="user" id="user" onChange={changeUser}>
			<option value="1">Алиса</option>
			<option value="2">Мия</option>
		</select>
	);
}

export default SelectUser;